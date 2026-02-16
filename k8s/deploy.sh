#!/usr/bin/env bash
# Deploy DevOps SRE Practice to Kubernetes
# Usage: ./deploy.sh [namespace]

set -euo pipefail

NAMESPACE="${1:-devopssrepractice}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Deploying to namespace: $NAMESPACE"

# Apply in dependency order
kubectl apply -f "$SCRIPT_DIR/namespace.yaml"
kubectl apply -f "$SCRIPT_DIR/configmap.yaml"
kubectl apply -f "$SCRIPT_DIR/secrets.yaml"
kubectl apply -f "$SCRIPT_DIR/postgres.yaml"

echo "==> Waiting for PostgreSQL to be ready…"
kubectl -n "$NAMESPACE" rollout status deployment/postgres --timeout=120s

kubectl apply -f "$SCRIPT_DIR/api.yaml"
kubectl apply -f "$SCRIPT_DIR/web.yaml"

echo "==> Waiting for API deployment…"
kubectl -n "$NAMESPACE" rollout status deployment/api --timeout=120s

echo "==> Waiting for Web deployment…"
kubectl -n "$NAMESPACE" rollout status deployment/web --timeout=120s

kubectl apply -f "$SCRIPT_DIR/ingress.yaml"

echo ""
echo "==> Deployment complete!"
echo "    Pods:"
kubectl -n "$NAMESPACE" get pods
echo ""
echo "    Services:"
kubectl -n "$NAMESPACE" get svc
