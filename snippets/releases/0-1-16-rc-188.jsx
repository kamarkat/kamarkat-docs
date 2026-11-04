export const release = {
  "version": "0.1.16-rc.188",
  "groups": [
    {
      "id": "management",
      "title": "Management cluster"
    },
    {
      "id": "managed",
      "title": "Managed clusters"
    },
    {
      "id": "bootstrap",
      "title": "Bootstrap tools"
    }
  ],
  "nodes": [
    {
      "id": "control-plane",
      "title": "Control plane nodes"
    },
    {
      "id": "worker",
      "title": "Worker nodes"
    }
  ],
  "provider": "hetzner",
  "components": [
    {
      "name": "agentgateway",
      "component": "agentgateway",
      "description": "The gateway that serves application and platform routes.",
      "license": "Apache-2.0",
      "layer": "workload-infrastructure",
      "type": "container",
      "cluster": "management",
      "source": "cr.agentgateway.dev/agentgateway",
      "nodes": [
        "worker"
      ],
      "where": [
        "api-gateway",
        "credit-authority"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "digest-pinned, v1.4.1",
      "digests": [
        "sha256:9d3e6044ddcdc0878b1787f77bd401252b95e22684203fb5e874c4c42d2ed90c",
        "sha256:efd79355b89094a8225a9db465d9a01dc656b377f0bab458761b935a13231d29"
      ],
      "url": "https://github.com/agentgateway/agentgateway",
      "latest": "1.7.0",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: a third copy carries a digest with no tag, so its version is unreportable. A tag is restored alongside the digest in the next release.",
          "target": "0.1.16-rc.189"
        },
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: the gateway ships at two versions in one release, one on the management cluster and one in the managed-cluster catalogue. They converge in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "alertmanager",
      "component": "Alertmanager",
      "description": "Routes the alerts rule evaluation raises, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/prom/alertmanager",
      "nodes": [
        "worker"
      ],
      "where": [
        "victoriametrics"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v0.34.1",
      "digests": [],
      "url": "https://github.com/prometheus/alertmanager",
      "latest": "0.34.2",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A patch behind, delivered by the observability operator rather than pinned directly. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "argocd",
      "component": "Argo CD",
      "description": "The GitOps engine. Reconciles every cluster to the GitOps repository and the pinned bundle.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "quay.io/argoproj/argocd",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-argocd"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart argo-cd 7.9.1"
      ],
      "version": "v2.14.11",
      "digests": [],
      "url": "https://github.com/argoproj/argo-cd",
      "latest": "3.5.6",
      "current": false,
      "behind": [
        {
          "status": "declined",
          "reason": "The newest release is a breaking major: it always enforces log access control, changes how resource ownership is tracked, and broadens the resources it ignores. The Day-0 seed installs this chart and an Application then adopts that same release, so both halves must move in one change or the engine upgrades itself while it is still reconciling the first boundary."
        }
      ]
    },
    {
      "name": "dex",
      "component": "Argo CD",
      "description": "The GitOps engine. Reconciles every cluster to the GitOps repository and the pinned bundle.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/dexidp/dex",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-argocd"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart argo-cd 7.9.1"
      ],
      "version": "v2.42.1",
      "digests": [],
      "url": "https://github.com/dexidp/dex",
      "latest": "2.46.1",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The identity broker the GitOps chart bundles. It is tracked against its own upstream project, and the chart pins which release ships, so it moves when the chart does rather than on its own. The newest broker release becomes reachable when the chart carrying it is adopted.",
          "blocked_by": "Argo CD"
        }
      ]
    },
    {
      "name": "busybox",
      "component": "BusyBox",
      "description": "Init steps that prepare a volume before its workload starts.",
      "license": "GPL-2.0-only",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/library/busybox",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-storage"
      ],
      "boundaries": [
        "01"
      ],
      "via": [],
      "version": "1.37.0",
      "digests": [
        "sha256:9db7b59979c38555a39def84a31fb98b5296952f9e3afd4f6f11f05b07adfab0"
      ],
      "url": "https://git.busybox.net/busybox",
      "latest": "1.38.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A minor behind. A helper image in hand-written manifests, with no chart governing it."
        }
      ]
    },
    {
      "name": "capi2argo-cluster-operator",
      "component": "capi2argo",
      "description": "Registers each cluster Cluster API creates with the GitOps engine.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/dntosas/capi2argo-cluster-operator",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-capi2argo"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.5.0",
      "digests": [
        "sha256:fb8c6457ef6e44d4c4d8a3468feb0d19e973867e0544d6cbc38f837411f3498c"
      ],
      "url": "https://github.com/dntosas/capi2argo-cluster-operator",
      "latest": "1.5.0",
      "current": true
    },
    {
      "name": "cert-manager-controller",
      "component": "cert-manager",
      "description": "Issues and renews the TLS certificates for every gateway and webhook.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "quay.io/jetstack/cert-manager-controller",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-cert-manager"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.20.2",
      "digests": [],
      "url": "https://github.com/cert-manager/cert-manager",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Installed before the GitOps engine exists, from a release URL held in a build constant, as a prerequisite of the cluster lifecycle controllers. It moves with that controller set.",
          "blocked_by": "Cluster API",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "cert-manager-webhook",
      "component": "cert-manager",
      "description": "Issues and renews the TLS certificates for every gateway and webhook.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "quay.io/jetstack/cert-manager-webhook",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-cert-manager"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.20.2",
      "digests": [],
      "url": "https://github.com/cert-manager/cert-manager",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Installed before the GitOps engine exists, from a release URL held in a build constant, as a prerequisite of the cluster lifecycle controllers. It moves with that controller set.",
          "blocked_by": "Cluster API",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "cert-manager-webhook-hetzner",
      "component": "cert-manager DNS-01 webhook",
      "description": "Proves domain ownership for certificates through the provider's DNS.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/hetzner/cert-manager-webhook-hetzner",
      "nodes": [
        "worker"
      ],
      "where": [
        "ingress-config"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v0.9.0",
      "digests": [],
      "url": "https://github.com/hetzner/cert-manager-webhook-hetzner",
      "latest": "0.9.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A patch release behind, in a vendored render. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "cilium",
      "component": "Cilium",
      "description": "Container networking, network policy and the Gateway API implementation.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "quay.io/cilium/cilium",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "installed by the soloz CLI"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.17.18",
      "digests": [
        "sha256:2f2c611db8de2f9c4846ee80fa3371617218dcd0cce42cf0d7d40b4d06458a23"
      ],
      "url": "https://github.com/cilium/cilium",
      "latest": "1.20.4",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The shipped release supports Kubernetes below 1.33, so it moves with Kubernetes rather than ahead of it. Upstream supports consecutive-minor upgrades only, and the delivered payload carries hand-applied patches that must be re-applied to any new render.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "operator-generic",
      "component": "Cilium",
      "description": "Container networking, network policy and the Gateway API implementation.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "quay.io/cilium/operator-generic",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "installed by the soloz CLI"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.17.18",
      "digests": [
        "sha256:ec68d574d2288f2d8cb0ae50778c1a0b08a6165cfcb6ba5bc5595d99ed3f7bda"
      ],
      "url": "https://github.com/cilium/cilium",
      "latest": "1.20.4",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The shipped release supports Kubernetes below 1.33, so it moves with Kubernetes rather than ahead of it. Upstream supports consecutive-minor upgrades only, and the delivered payload carries hand-applied patches that must be re-applied to any new render.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "cluster-api-controller",
      "component": "Cluster API",
      "description": "Declarative cluster lifecycle. Creates, scales and replaces the management cluster and managed clusters.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/cluster-api/cluster-api-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "Cluster API"
      ],
      "boundaries": [],
      "via": [
        "core provider v1.10.0"
      ],
      "version": "v1.10.0",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/cluster-api",
      "latest": "1.14.3",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Capped by the infrastructure provider, whose current line is tested against Cluster API 1.13 and below. The newest Cluster API is unreachable until that provider ships its next line.",
          "blocked_by": "Cluster API provider for Hetzner",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "cluster-api-operator",
      "component": "Cluster API",
      "description": "Declarative cluster lifecycle. Creates, scales and replaces the management cluster and managed clusters.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/capi-operator/cluster-api-operator",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "installed by the soloz CLI"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.13.0",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/cluster-api-operator",
      "latest": "0.30.0",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The operator installs the provider versions it is given, so it moves with the provider set rather than on its own. Its manifest is vendored, so the version and the vendored copy move together.",
          "blocked_by": "Cluster API",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubeadm-bootstrap-controller",
      "component": "Cluster API",
      "description": "Declarative cluster lifecycle. Creates, scales and replaces the management cluster and managed clusters.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/cluster-api/kubeadm-bootstrap-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "Cluster API"
      ],
      "boundaries": [],
      "via": [
        "bootstrap provider v1.8.5"
      ],
      "version": "v1.8.5",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/cluster-api",
      "latest": "1.14.3",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: the kubeadm bootstrap and control-plane providers were left behind the core provider, so one release ships a mismatched Cluster API set. They move to the core provider's version in the next release.",
          "blocked_by": "Cluster API",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubeadm-control-plane-controller",
      "component": "Cluster API",
      "description": "Declarative cluster lifecycle. Creates, scales and replaces the management cluster and managed clusters.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/cluster-api/kubeadm-control-plane-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "Cluster API"
      ],
      "boundaries": [],
      "via": [
        "control-plane provider v1.8.5"
      ],
      "version": "v1.8.5",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/cluster-api",
      "latest": "1.14.3",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: the kubeadm bootstrap and control-plane providers were left behind the core provider, so one release ships a mismatched Cluster API set. They move to the core provider's version in the next release.",
          "blocked_by": "Cluster API",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "caph",
      "component": "Cluster API provider for Hetzner",
      "description": "Creates cluster machines, networks and load balancers in the cloud account.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/syself/caph",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "Cluster API"
      ],
      "boundaries": [],
      "via": [
        "infrastructure provider v1.0.7"
      ],
      "version": "v1.0.7",
      "digests": [],
      "url": "https://github.com/syself/cluster-api-provider-hetzner",
      "latest": "1.1.10",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newer line drops Kubernetes 1.31, which the nodes still run, so it moves with Kubernetes. It also still implements the deprecated Cluster API contract, which is what caps Cluster API itself.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "spoke-identity-operator",
      "component": "Cluster identity operator",
      "description": "Gives each managed cluster its identity with the management cluster.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/soloz-io/spoke-identity-operator",
      "nodes": [
        "worker"
      ],
      "where": [
        "spoke-identity-operator"
      ],
      "boundaries": [
        "04"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:c265343a0d8546312f2f3bf4fa78ed9a6ed6227ff49f9857e05c2d94c3245218"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "c08a0d6f",
      "current": true
    },
    {
      "name": "cluster-proportional-autoscaler",
      "component": "Cluster proportional autoscaler",
      "description": "Scales cluster DNS with the size of the cluster.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/cpa/cluster-proportional-autoscaler",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-dns"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.9.0",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/cluster-proportional-autoscaler",
      "latest": "1.10.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A minor behind, pinned beside the DNS cache it scales. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "containerd",
      "component": "containerd",
      "description": "The container runtime on every node.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "pkg:containerd",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "2.4.2",
      "digests": [],
      "url": "https://github.com/containerd/containerd",
      "latest": "2.4.2",
      "current": true
    },
    {
      "name": "mcp-server",
      "component": "Control-plane API",
      "description": "The control plane's API.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/soloz-io/zero-ops/mcp-server",
      "nodes": [
        "worker"
      ],
      "where": [
        "mcp-server"
      ],
      "boundaries": [
        "04"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:990bfec09d9e6e89ac6e375f8137d014ce870ad19cec61b40bbfb464838928e0"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "d8adecf4",
      "current": true
    },
    {
      "name": "coredns",
      "component": "CoreDNS",
      "description": "Cluster DNS.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/coredns/coredns",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.11.3",
      "digests": [],
      "url": "https://github.com/coredns/coredns",
      "latest": "1.15.0",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Not independently pinned. kubeadm chooses CoreDNS for the Kubernetes version in use, so this moves only when Kubernetes does.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "crossplane",
      "component": "Crossplane",
      "description": "Composition. Turns one declaration into the set of resources behind it.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "xpkg.crossplane.io/crossplane/crossplane",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-crossplane"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart crossplane 1.20.5"
      ],
      "version": "v1.20.5",
      "digests": [],
      "url": "https://github.com/crossplane/crossplane",
      "latest": "2.4.3",
      "current": false,
      "behind": [
        {
          "status": "declined",
          "reason": "The newest release is a breaking major: it removes claims, so every composite definition has to be re-declared before the engine can move. Taking it is a migration of the definitions that provision clusters and tenant databases, not a version bump.",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "provider-kubernetes",
      "component": "Crossplane Kubernetes provider",
      "description": "Lets a composition create objects in any cluster the platform manages.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "xpkg.upbound.io/crossplane-contrib/provider-kubernetes",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-crossplane-providers"
      ],
      "boundaries": [
        "01"
      ],
      "via": [],
      "version": "v1.3.1",
      "digests": [],
      "url": "https://github.com/crossplane-contrib/provider-kubernetes",
      "latest": "1.4.1",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Crossplane: the provider line has to match the engine major, because the scope of its managed resources differs between them.",
          "blocked_by": "Crossplane"
        }
      ]
    },
    {
      "name": "csi-attacher",
      "component": "CSI sidecars",
      "description": "The standard Kubernetes storage sidecars the CSI driver runs with.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/sig-storage/csi-attacher",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "infrastructure-provider",
        "installed by the soloz CLI"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v4.8.1",
      "digests": [],
      "url": "https://github.com/kubernetes-csi/external-attacher",
      "latest": "4.13.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Five sidecars on five independent release series, pinned beside the storage driver's manifest. Each has its own newest release; none has been assessed.",
          "blocked_by": "Hetzner CSI driver"
        }
      ]
    },
    {
      "name": "csi-node-driver-registrar",
      "component": "CSI sidecars",
      "description": "The standard Kubernetes storage sidecars the CSI driver runs with.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/sig-storage/csi-node-driver-registrar",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "infrastructure-provider",
        "installed by the soloz CLI"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v2.13.0",
      "digests": [],
      "url": "https://github.com/kubernetes-csi/node-driver-registrar",
      "latest": "2.18.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Five sidecars on five independent release series, pinned beside the storage driver's manifest. Each has its own newest release; none has been assessed.",
          "blocked_by": "Hetzner CSI driver"
        }
      ]
    },
    {
      "name": "csi-provisioner",
      "component": "CSI sidecars",
      "description": "The standard Kubernetes storage sidecars the CSI driver runs with.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/sig-storage/csi-provisioner",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "infrastructure-provider",
        "installed by the soloz CLI"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v5.2.0",
      "digests": [],
      "url": "https://github.com/kubernetes-csi/external-provisioner",
      "latest": "6.4.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Five sidecars on five independent release series, pinned beside the storage driver's manifest. Each has its own newest release; none has been assessed.",
          "blocked_by": "Hetzner CSI driver"
        }
      ]
    },
    {
      "name": "csi-resizer",
      "component": "CSI sidecars",
      "description": "The standard Kubernetes storage sidecars the CSI driver runs with.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/sig-storage/csi-resizer",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "infrastructure-provider",
        "installed by the soloz CLI"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.13.2",
      "digests": [],
      "url": "https://github.com/kubernetes-csi/external-resizer",
      "latest": "2.3.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Five sidecars on five independent release series, pinned beside the storage driver's manifest. Each has its own newest release; none has been assessed.",
          "blocked_by": "Hetzner CSI driver"
        }
      ]
    },
    {
      "name": "livenessprobe",
      "component": "CSI sidecars",
      "description": "The standard Kubernetes storage sidecars the CSI driver runs with.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/sig-storage/livenessprobe",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "infrastructure-provider",
        "installed by the soloz CLI"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v2.15.0",
      "digests": [],
      "url": "https://github.com/kubernetes-csi/livenessprobe",
      "latest": "2.20.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Five sidecars on five independent release series, pinned beside the storage driver's manifest. Each has its own newest release; none has been assessed.",
          "blocked_by": "Hetzner CSI driver"
        }
      ]
    },
    {
      "name": "curl",
      "component": "curl",
      "description": "An HTTP client image for one-time setup jobs and network probes.",
      "license": "curl",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/curlimages/curl",
      "nodes": [
        "worker"
      ],
      "where": [
        "credit-authority"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:11e64e28c5f58c8d93ee95fcf22ac055f48b0bc440e0ce7d8013bbb5ad6aa8ac"
      ],
      "url": "https://github.com/curl/curl",
      "latest": "8.23.0",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: pinned by digest with no tag, so its version is unreportable. A tag is restored alongside the digest in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "etcd",
      "component": "etcd",
      "description": "The control plane's key-value store.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/etcd",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "3.5.15-0",
      "digests": [],
      "url": "https://github.com/etcd-io/etcd",
      "latest": "3.7.3",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Not independently pinned. kubeadm chooses etcd for the Kubernetes version in use, so this moves only when Kubernetes does and will not reach etcd's own newest release.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "external-secrets",
      "component": "External Secrets",
      "description": "Secret delivery. Copies each workload's secrets from the secret store into its namespace.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/external-secrets/external-secrets",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-external-secrets"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart external-secrets 2.2.0"
      ],
      "version": "v2.2.0",
      "digests": [],
      "url": "https://github.com/external-secrets/external-secrets",
      "latest": "2.14.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors. Nobody has assessed the move; the operator serves the API versions the platform's objects already use, so no object migration is expected."
        }
      ]
    },
    {
      "name": "external-dns",
      "component": "ExternalDNS",
      "description": "Publishes DNS records for every public hostname.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/external-dns/external-dns",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "platform-external-dns"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v0.15.0",
      "digests": [
        "sha256:338dd8c526e1337a12db0c8ee81a59ce5815ea51b73756affcd1e5dca530105c"
      ],
      "url": "https://github.com/kubernetes-sigs/external-dns",
      "latest": "0.24.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors, pinned as an image rather than installed from a chart. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "external-dns-hetzner-webhook",
      "component": "ExternalDNS provider webhook",
      "description": "Connects ExternalDNS to the provider's DNS service.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/hetzner/external-dns-hetzner-webhook",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "platform-external-dns"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v0.3.4",
      "digests": [
        "sha256:17d6d7f09b3419e27eb1abd4a4a0d7fddac84192a2c681e65c356056fc3a9253"
      ],
      "url": "https://github.com/hetzner/external-dns-hetzner-webhook",
      "latest": "0.5.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by two minors and paired with the DNS controller above. Nobody has assessed the move.",
          "blocked_by": "ExternalDNS"
        }
      ]
    },
    {
      "name": "ledger",
      "component": "Formance Ledger",
      "description": "The ledger Credit Authority records every credit grant and spend in.",
      "license": "MIT",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/formancehq/ledger",
      "nodes": [
        "worker"
      ],
      "where": [
        "credit-authority"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:fc624af4dde0b9fa8b43ae02b7297fc3f15266df7c9806edec794f1420b40e62"
      ],
      "url": "https://github.com/formancehq/ledger",
      "latest": "2.4.17",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: pinned by digest with no tag, so the release cannot report which ledger version it runs. A tag is restored alongside the digest in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "grafana",
      "component": "Grafana",
      "description": "Dashboards for metrics and logs.",
      "license": "AGPL-3.0-only",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/grafana/grafana",
      "nodes": [
        "worker"
      ],
      "where": [
        "grafana"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "Grafana operator v5.24.0"
      ],
      "version": "13.0.1",
      "digests": [],
      "url": "https://github.com/grafana/grafana",
      "latest": "13.3.0",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: the instance carries no image at all, so its version is whatever the operator release defaults to and an operator bump moves it silently. An explicit image is pinned in the next release.",
          "blocked_by": "Grafana operator",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "alloy",
      "component": "Grafana Alloy",
      "description": "Collects metrics and logs on every node and cluster.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/grafana/alloy",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "grafana-alloy"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.20.1",
      "digests": [
        "sha256:2aa2099af76c0098d4af7a4d6e48f86cb66dc1a000222ad927a1c67c6542d13f"
      ],
      "url": "https://github.com/grafana/alloy",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A patch behind, in a vendored render. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "grafana-operator",
      "component": "Grafana operator",
      "description": "Manages dashboards and data sources as declarations.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/grafana/grafana-operator",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-dashboards"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v5.24.0",
      "digests": [
        "sha256:e72d11ac579a000fe0ddcc0c3341a5103a1c93a28fbc394dc7c7009ed071d1a7"
      ],
      "url": "https://github.com/grafana/grafana-operator",
      "latest": "5.25.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A minor behind. Nobody has assessed the move; it also sets the instance version today, which is the defect recorded against the instance."
        }
      ]
    },
    {
      "name": "headlamp",
      "component": "Headlamp",
      "description": "The cluster console.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/headlamp-k8s/headlamp",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-headlamp"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v0.45.0",
      "digests": [],
      "url": "https://github.com/headlamp-k8s/headlamp",
      "latest": "0.46.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A minor behind. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "hetzner-cloud-controller-manager",
      "component": "Hetzner cloud controller manager",
      "description": "Node lifecycle and load balancers in the cloud account.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/syself/hetzner-cloud-controller-manager",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "infrastructure-provider",
        "installed by the soloz CLI"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v2.0.7",
      "digests": [],
      "url": "https://github.com/syself/hetzner-cloud-controller-manager",
      "latest": "2.0.7",
      "current": true
    },
    {
      "name": "hcloud-csi-driver",
      "component": "Hetzner CSI driver",
      "description": "Block-storage volumes for persistent data.",
      "license": "MIT",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/hetznercloud/hcloud-csi-driver",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "infrastructure-provider",
        "installed by the soloz CLI"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v2.13.0",
      "digests": [],
      "url": "https://github.com/hetznercloud/csi-driver",
      "latest": "2.24.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors. Nobody has assessed the move; the driver is delivered as a hand-assembled manifest, so its sidecars are pinned here rather than by a chart."
        }
      ]
    },
    {
      "name": "infisical",
      "component": "Infisical",
      "description": "The secret store. Holds every platform and application secret.",
      "license": "MIT (enterprise directory unused)",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/infisical/infisical",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-infisical"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v0.160.11",
      "digests": [],
      "url": "https://github.com/Infisical/infisical",
      "latest": "0.167.4",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several patch releases, in a vendored chart. Nobody has assessed the move, and it runs database migrations on start, so it needs its own validation."
        }
      ]
    },
    {
      "name": "pki-issuer",
      "component": "Infisical PKI issuer",
      "description": "Issues internal certificates from the secret store's certificate authority.",
      "license": "MIT",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/infisical/pki-issuer",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-security-infra"
      ],
      "boundaries": [
        "01"
      ],
      "via": [],
      "version": "v0.2.0",
      "digests": [],
      "url": "https://github.com/Infisical/infisical-issuer",
      "latest": "1.0.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "The newest release is a major. Nobody has assessed what it changes for the issuer the platform declares."
        }
      ]
    },
    {
      "name": "kube-state-metrics",
      "component": "kube-state-metrics",
      "description": "Exposes the state of Kubernetes objects as metrics.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/kube-state-metrics/kube-state-metrics",
      "nodes": [
        "worker"
      ],
      "where": [
        "kube-state-metrics"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "chart kube-state-metrics 5.27.0"
      ],
      "version": "v2.14.0",
      "digests": [],
      "url": "https://github.com/kubernetes/kube-state-metrics",
      "latest": "2.20.0",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Each release of this exporter is built against one Kubernetes client version, and the project supports only the pairing. The release matching the target Kubernetes is not the newest one, so this is capped by the Kubernetes destination rather than free to move.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubectl",
      "component": "kubectl",
      "description": "Runs one-off jobs against the cluster API.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/kubectl",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "installed by the soloz CLI"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.31.6",
      "digests": [
        "sha256:0340f50e46e77889398f41becf071e8d0f6be7672652a30e209112002147c06f"
      ],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: this is the client the node bootstrap and init containers run, held within one minor of the API server.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kube-apiserver",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/kube-apiserver",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest policy engine release supports Kubernetes 1.33 to 1.35, and its webhooks gate every deployment, so the newest Kubernetes is not reachable while it is in the stack. 1.35.10 is the destination; 1.37.2 is not available at any policy-engine version.",
          "blocked_by": "Kyverno",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kube-controller-manager",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/kube-controller-manager",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest policy engine release supports Kubernetes 1.33 to 1.35, and its webhooks gate every deployment, so the newest Kubernetes is not reachable while it is in the stack. 1.35.10 is the destination; 1.37.2 is not available at any policy-engine version.",
          "blocked_by": "Kyverno",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kube-proxy",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/kube-proxy",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest policy engine release supports Kubernetes 1.33 to 1.35, and its webhooks gate every deployment, so the newest Kubernetes is not reachable while it is in the stack. 1.35.10 is the destination; 1.37.2 is not available at any policy-engine version.",
          "blocked_by": "Kyverno",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kube-scheduler",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/kube-scheduler",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest policy engine release supports Kubernetes 1.33 to 1.35, and its webhooks gate every deployment, so the newest Kubernetes is not reachable while it is in the stack. 1.35.10 is the destination; 1.37.2 is not available at any policy-engine version.",
          "blocked_by": "Kyverno",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "pause",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/pause",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "3.10",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes/tree/master/build/pause",
      "latest": "3.10.2",
      "current": true
    },
    {
      "name": "kubeadm",
      "component": "Kubernetes node tools",
      "description": "kubelet runs the node's pods; kubeadm joins it to the cluster; kubectl is the command-line client.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "pkg:kubeadm",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: kubelet, kubeadm and kubectl are installed from the repository the node's Kubernetes version names.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubectl",
      "component": "Kubernetes node tools",
      "description": "kubelet runs the node's pods; kubeadm joins it to the cluster; kubectl is the command-line client.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "pkg:kubectl",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: kubelet, kubeadm and kubectl are installed from the repository the node's Kubernetes version names.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubelet",
      "component": "Kubernetes node tools",
      "description": "kubelet runs the node's pods; kubeadm joins it to the cluster; kubectl is the command-line client.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "pkg:kubelet",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: kubelet, kubeadm and kubectl are installed from the repository the node's Kubernetes version names.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "k8s",
      "component": "Kubernetes toolbox image",
      "description": "A container image with kubectl and other Kubernetes tools; runs the node labeler.",
      "license": "MIT",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/alpine/k8s",
      "nodes": [
        "worker"
      ],
      "where": [
        "zitadel"
      ],
      "boundaries": [
        "04"
      ],
      "via": [
        "chart zitadel 10.0.4"
      ],
      "version": "1.31.6",
      "digests": [],
      "url": "https://github.com/alpine-docker/k8s",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: the image tracks the cluster's Kubernetes minor.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "background-controller",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "reg.kyverno.io/kyverno/background-controller",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-kyverno"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart kyverno 3.9.1"
      ],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "cleanup-controller",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "reg.kyverno.io/kyverno/cleanup-controller",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-kyverno"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart kyverno 3.9.1"
      ],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kyverno",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "reg.kyverno.io/kyverno/kyverno",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-kyverno"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart kyverno 3.9.1"
      ],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kyverno-cli",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "reg.kyverno.io/kyverno/kyverno-cli",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-kyverno"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart kyverno 3.9.1"
      ],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kyvernopre",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "reg.kyverno.io/kyverno/kyvernopre",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-kyverno"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart kyverno 3.9.1"
      ],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "readiness-checker",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/kyverno/readiness-checker",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-kyverno"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart kyverno 3.9.1"
      ],
      "version": "latest, v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: the readiness-checker image is pinned to a moving tag, so what it runs is whatever the registry served last. It is pinned by digest in the next release.",
          "target": "0.1.16-rc.189"
        },
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "reports-controller",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "reg.kyverno.io/kyverno/reports-controller",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-kyverno"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart kyverno 3.9.1"
      ],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "local-path-provisioner",
      "component": "Local path provisioner",
      "description": "Node-local volumes on clusters without cloud block storage.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/rancher/local-path-provisioner",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-storage"
      ],
      "boundaries": [
        "01"
      ],
      "via": [],
      "version": "v0.0.30",
      "digests": [],
      "url": "https://github.com/rancher/local-path-provisioner",
      "latest": "0.0.37",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several patch releases, pinned in a hand-assembled manifest. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "auth-proxy",
      "component": "Login gateway",
      "description": "Signs people in before a request reaches a protected route.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/soloz-io/zero-ops/auth-proxy",
      "nodes": [
        "worker"
      ],
      "where": [
        "auth-proxy"
      ],
      "boundaries": [
        "04"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:ff22acc366654f3d0a7a38d7a31464ddde4aa59490f515dfbfe5ff2649d8eef6"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "7220ad92",
      "current": true
    },
    {
      "name": "loki",
      "component": "Loki",
      "description": "Log storage and search.",
      "license": "AGPL-3.0-only",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/grafana/loki",
      "nodes": [
        "worker"
      ],
      "where": [
        "loki"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "3.7.9",
      "digests": [
        "sha256:0db216b630ae1f348a1584c67f3cead8b4c1fc839169a39501db664744158e28"
      ],
      "url": "https://github.com/grafana/loki",
      "latest": "3.7.9",
      "current": true
    },
    {
      "name": "metrics-server",
      "component": "metrics-server",
      "description": "Resource metrics for autoscaling and `kubectl top`.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/metrics-server/metrics-server",
      "nodes": [
        "worker"
      ],
      "where": [
        "metrics-server"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "chart metrics-server 3.12.2"
      ],
      "version": "v0.7.2",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/metrics-server",
      "latest": "0.9.1",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest application release has no chart yet, and this is installed from a chart, so the reachable version is the newest the chart ships."
        }
      ]
    },
    {
      "name": "k8s-dns-node-cache",
      "component": "NodeLocal DNSCache",
      "description": "A DNS cache on every node.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "registry.k8s.io/dns/k8s-dns-node-cache",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-dns"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "1.23.1",
      "digests": [],
      "url": "https://github.com/kubernetes/dns",
      "latest": "1.26.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors, pinned in a hand-assembled manifest on both the management and managed clusters. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "kube-sbt",
      "component": "Organization provisioning",
      "description": "Provisions each organization and application declared in the GitOps repository.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/soloz-io/zero-ops/kube-sbt",
      "nodes": [
        "worker"
      ],
      "where": [
        "kube-sbt"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:f705cd09a4d88b6a2c3c079b203c0341ac0d03c50eccd5415ad712f07a1044bd"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "efd8edd1",
      "current": true
    },
    {
      "name": "function-patch-and-transform",
      "component": "Patch and transform function",
      "description": "The composition function the platform's compositions are written in.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-crossplane-providers"
      ],
      "boundaries": [
        "01"
      ],
      "via": [],
      "version": "v0.8.0",
      "digests": [],
      "url": "https://github.com/crossplane-contrib/function-patch-and-transform",
      "latest": "0.11.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Crossplane: composition functions are resolved by the engine, so the function moves with it.",
          "blocked_by": "Crossplane"
        }
      ]
    },
    {
      "name": "hub-operator",
      "component": "Platform operator",
      "description": "Reconciles the management cluster's own platform state.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/soloz-io/zero-ops/hub-operator",
      "nodes": [
        "worker"
      ],
      "where": [
        "hub-operator"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:ff309121b7b558b604b0790bf3a596cc31e9044f620f77e211c7995683807811"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "efd8edd1",
      "current": true
    },
    {
      "name": "postgres",
      "component": "PostgreSQL",
      "description": "The platform database and each application's database.",
      "license": "PostgreSQL",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/library/postgres",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-database",
        "platform-infisical"
      ],
      "boundaries": [
        "02",
        "03"
      ],
      "via": [],
      "version": "15-alpine, 16-alpine",
      "digests": [
        "sha256:fe0737ba566a2c5b2a28f34433c0a423261900ec17b9bf7ad115e1aae7e57f1b"
      ],
      "url": "https://github.com/postgres/postgres",
      "latest": "18.6",
      "current": false,
      "behind": [
        {
          "status": "declined",
          "reason": "Each application selects the newest major it supports, so these differ on purpose. The newest major is declined where a consumer does not support it: the identity store documents support but has an unresolved fresh-install failure on it, and the secret store documents only a floor.",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "redis",
      "component": "Redis",
      "description": "The platform cache.",
      "license": "BSD-3-Clause (7.x); AGPL-3.0-only (8.x)",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/library/redis",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-argocd",
        "platform-redis",
        "platform-tenant-platform"
      ],
      "boundaries": [
        "01",
        "02",
        "03"
      ],
      "via": [
        "chart argo-cd 7.9.1"
      ],
      "version": "7.2.8-alpine, 8.6-alpine, digest-pinned",
      "digests": [
        "sha256:e7723ff73d963f5cc6d9c4643ea3d989527a402a319239054e9472a7fb9219a2"
      ],
      "url": "https://github.com/redis/redis",
      "latest": "8.10.3",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: three different versions of the same cache ship in one release, from separate manifests that were never reconciled. They converge on one version in the next release.",
          "target": "0.1.16-rc.189"
        },
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: one copy is pinned by digest with no tag, so the release cannot report what it runs and nobody can tell whether it is current. A tag is restored alongside the digest in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "reloader",
      "component": "Reloader",
      "description": "Restarts a workload when a secret or config map it reads changes.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/stakater/reloader",
      "nodes": [
        "worker"
      ],
      "where": [
        "stakater-reloader"
      ],
      "boundaries": [
        "01"
      ],
      "via": [
        "chart reloader 1.2.1"
      ],
      "version": "v1.2.1",
      "digests": [],
      "url": "https://github.com/stakater/Reloader",
      "latest": "1.4.23",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "runc",
      "component": "runc",
      "description": "The low-level runtime containerd starts containers with.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "pkg:runc",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.5.2",
      "digests": [],
      "url": "https://github.com/opencontainers/runc",
      "latest": "1.5.2",
      "current": true
    },
    {
      "name": "support-agent",
      "component": "Support agent",
      "description": "Reports allowlisted control-plane facts when an organization enrols. Does nothing until then.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/soloz-io/zero-ops/support-agent",
      "nodes": [
        "worker"
      ],
      "where": [
        "support-agent"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:b0522975b8305072ef0a765329467c4f1719da4feba5b7151915c0147fb23541"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "c08a0d6f",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: this release ships the 2026-09-13 build. A later build exists, but the commit that pins it back into the deployment never landed, so the newer image was published and never shipped. The pin-back lands in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "tailscale",
      "component": "Tailscale",
      "description": "Joins the node to the tailnet when a tailnet hostname is configured for it.",
      "license": "BSD-3-Clause",
      "layer": "machinery",
      "type": "package",
      "cluster": "management",
      "source": "pkg:tailscale",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "control plane"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.104.4",
      "digests": [],
      "url": "https://github.com/tailscale/tailscale",
      "latest": "1.104.4",
      "current": true
    },
    {
      "name": "ubuntu",
      "component": "Ubuntu",
      "description": "The node operating system, the provider's stock image.",
      "license": "Per package; see /usr/share/doc/<package>/copyright on the node",
      "layer": "machinery",
      "type": "os",
      "cluster": "management",
      "source": "os:ubuntu",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "24.04",
      "digests": [],
      "url": "https://launchpad.net/ubuntu",
      "latest": "26.04",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The node image is the provider's own published system image, named by the exact string the provider uses. Whether the newest release is published in the cloud catalogue, and under what name, is not readable without provider credentials and has not been confirmed. The newest image may also be built for a narrower processor baseline than the machine types in use, which is a separate question from availability.",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "victoria-metrics",
      "component": "VictoriaMetrics",
      "description": "The metrics store, rule evaluation and the authenticating proxy in front of them, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/victoriametrics/victoria-metrics",
      "nodes": [
        "worker"
      ],
      "where": [
        "victoriametrics"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v1.152.0",
      "digests": [],
      "url": "https://github.com/VictoriaMetrics/VictoriaMetrics",
      "latest": "1.155.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by three patch releases, in a vendored render whose values are recorded in prose rather than a values file, so re-rendering has to be reconstructed before it can be trusted."
        }
      ]
    },
    {
      "name": "vmalert",
      "component": "VictoriaMetrics",
      "description": "The metrics store, rule evaluation and the authenticating proxy in front of them, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/victoriametrics/vmalert",
      "nodes": [
        "worker"
      ],
      "where": [
        "victoriametrics"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v1.152.0",
      "digests": [],
      "url": "https://github.com/VictoriaMetrics/VictoriaMetrics",
      "latest": "1.155.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by three patch releases, in a vendored render whose values are recorded in prose rather than a values file, so re-rendering has to be reconstructed before it can be trusted."
        }
      ]
    },
    {
      "name": "vmauth",
      "component": "VictoriaMetrics",
      "description": "The metrics store, rule evaluation and the authenticating proxy in front of them, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/victoriametrics/vmauth",
      "nodes": [
        "worker"
      ],
      "where": [
        "victoriametrics"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v1.152.0",
      "digests": [],
      "url": "https://github.com/VictoriaMetrics/VictoriaMetrics",
      "latest": "1.155.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by three patch releases, in a vendored render whose values are recorded in prose rather than a values file, so re-rendering has to be reconstructed before it can be trusted."
        }
      ]
    },
    {
      "name": "operator",
      "component": "VictoriaMetrics operator",
      "description": "Runs the metrics stores.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/victoriametrics/operator",
      "nodes": [
        "worker"
      ],
      "where": [
        "victoriametrics",
        "victoriametrics-operator"
      ],
      "boundaries": [
        "03"
      ],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "config-reloader-v0.75.0, v0.75.0",
      "digests": [
        "sha256:78da26b41a819093707be2ab6a65a5dc19f43d58ec52f30b49a545c2c6b7bd55"
      ],
      "url": "https://github.com/VictoriaMetrics/operator",
      "latest": "0.75.2",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Two patch releases behind, in the same vendored render as the stores. The operator and its config reloader move together because one render produces both."
        }
      ]
    },
    {
      "name": "wait4x",
      "component": "wait4x",
      "description": "Waits until a dependency, such as a database, accepts connections before its workload starts.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "docker.io/wait4x/wait4x",
      "nodes": [
        "worker"
      ],
      "where": [
        "zitadel"
      ],
      "boundaries": [
        "04"
      ],
      "via": [
        "chart zitadel 10.0.4"
      ],
      "version": "3.6",
      "digests": [],
      "url": "https://github.com/wait4x/wait4x",
      "latest": "3.7.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by patch releases. A helper image used by init containers to wait on dependencies."
        }
      ]
    },
    {
      "name": "zitadel",
      "component": "ZITADEL",
      "description": "The identity provider. Sign-in for people and identities for applications.",
      "license": "AGPL-3.0-only",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/zitadel/zitadel",
      "nodes": [
        "worker"
      ],
      "where": [
        "zitadel"
      ],
      "boundaries": [
        "04"
      ],
      "via": [
        "chart zitadel 10.0.4"
      ],
      "version": "v4.15.3",
      "digests": [],
      "url": "https://github.com/zitadel/zitadel",
      "latest": "4.20.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors within the same major, in a vendored chart. It runs database migrations on start, so the move needs its own validation."
        }
      ]
    },
    {
      "name": "zitadel-login",
      "component": "ZITADEL",
      "description": "The identity provider. Sign-in for people and identities for applications.",
      "license": "AGPL-3.0-only",
      "layer": "machinery",
      "type": "container",
      "cluster": "management",
      "source": "ghcr.io/zitadel/zitadel-login",
      "nodes": [
        "worker"
      ],
      "where": [
        "zitadel"
      ],
      "boundaries": [
        "04"
      ],
      "via": [
        "chart zitadel 10.0.4"
      ],
      "version": "v4.15.3",
      "digests": [],
      "url": "https://github.com/zitadel/zitadel",
      "latest": "4.20.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors within the same major, in a vendored chart. It runs database migrations on start, so the move needs its own validation."
        }
      ]
    },
    {
      "name": "agent-sandbox-controller",
      "component": "Agent sandbox controller",
      "description": "Runs isolated, short-lived sandboxes for application jobs.",
      "license": "Apache-2.0",
      "layer": "workload-infrastructure",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/agent-sandbox/agent-sandbox-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.5.0",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/agent-sandbox",
      "latest": "1.0.9",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "The newest release is a major, crossing 1.0. Nobody has assessed what it changes for the sandbox resources the platform declares."
        }
      ]
    },
    {
      "name": "agentgateway",
      "component": "agentgateway",
      "description": "The gateway that serves application and platform routes.",
      "license": "Apache-2.0",
      "layer": "workload-infrastructure",
      "type": "container",
      "cluster": "managed",
      "source": "cr.agentgateway.dev/agentgateway",
      "nodes": [
        "worker"
      ],
      "where": [
        "universal-tenant"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.6.0",
      "digests": [
        "sha256:9d3e6044ddcdc0878b1787f77bd401252b95e22684203fb5e874c4c42d2ed90c"
      ],
      "url": "https://github.com/agentgateway/agentgateway",
      "latest": "1.7.0",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: the gateway ships at two versions in one release, one on the management cluster and one in the managed-cluster catalogue. They converge in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "alertmanager",
      "component": "Alertmanager",
      "description": "Routes the alerts rule evaluation raises, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/prom/alertmanager",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v0.34.1",
      "digests": [],
      "url": "https://github.com/prometheus/alertmanager",
      "latest": "0.34.2",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A patch behind, delivered by the observability operator rather than pinned directly. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "argocd",
      "component": "Argo CD",
      "description": "The GitOps engine. Reconciles every cluster to the GitOps repository and the pinned bundle.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/argoproj/argocd",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-bootstrap-templates"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v2.11.2",
      "digests": [],
      "url": "https://github.com/argoproj/argo-cd",
      "latest": "3.5.6",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: the managed clusters run a hand-assembled minimal install that was never moved with the management cluster's, so one release ships two Argo CD versions three minors apart. The newest upstream equivalent configures through far more environment values than the local copy carries, so it is re-derived from upstream rather than bumped.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "argocd-agent",
      "component": "Argo CD agent",
      "description": "Connects each managed cluster's GitOps engine to the management cluster over an outbound channel.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/argoprojlabs/argocd-agent",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-bootstrap-templates"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v0.9.0",
      "digests": [
        "sha256:394b9166d03895146a82c3a8f33ae5c99fda9f54e3b903bbd15737ea9890a766"
      ],
      "url": "https://github.com/argoproj-labs/argocd-agent",
      "latest": "0.10.0",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The agent and the hub-side principal are one pair and are pinned to the same build, so this moves as a pair rather than per side."
        }
      ]
    },
    {
      "name": "argo-rollouts",
      "component": "Argo Rollouts",
      "description": "Progressive delivery for application workloads.",
      "license": "Apache-2.0",
      "layer": "workload-infrastructure",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/argoproj/argo-rollouts",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.9.1",
      "digests": [],
      "url": "https://github.com/argoproj/argo-rollouts",
      "latest": "1.10.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A minor behind. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "busybox",
      "component": "BusyBox",
      "description": "Init steps that prepare a volume before its workload starts.",
      "license": "GPL-2.0-only",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/library/busybox",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.37.0",
      "digests": [],
      "url": "https://git.busybox.net/busybox",
      "latest": "1.38.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A minor behind. A helper image in hand-written manifests, with no chart governing it."
        }
      ]
    },
    {
      "name": "cert-manager-cainjector",
      "component": "cert-manager",
      "description": "Issues and renews the TLS certificates for every gateway and webhook.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/jetstack/cert-manager-cainjector",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.21.1",
      "digests": [],
      "url": "https://github.com/cert-manager/cert-manager",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "The managed-cluster copy is vendored separately from the prerequisite above and nobody has assessed its move; the two are at different versions as a result."
        }
      ]
    },
    {
      "name": "cert-manager-controller",
      "component": "cert-manager",
      "description": "Issues and renews the TLS certificates for every gateway and webhook.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/jetstack/cert-manager-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.21.1",
      "digests": [],
      "url": "https://github.com/cert-manager/cert-manager",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "The managed-cluster copy is vendored separately from the prerequisite above and nobody has assessed its move; the two are at different versions as a result."
        }
      ]
    },
    {
      "name": "cert-manager-startupapicheck",
      "component": "cert-manager",
      "description": "Issues and renews the TLS certificates for every gateway and webhook.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/jetstack/cert-manager-startupapicheck",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.21.1",
      "digests": [],
      "url": "https://github.com/cert-manager/cert-manager",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "The managed-cluster copy is vendored separately from the prerequisite above and nobody has assessed its move; the two are at different versions as a result."
        }
      ]
    },
    {
      "name": "cert-manager-webhook",
      "component": "cert-manager",
      "description": "Issues and renews the TLS certificates for every gateway and webhook.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/jetstack/cert-manager-webhook",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.21.1",
      "digests": [],
      "url": "https://github.com/cert-manager/cert-manager",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "The managed-cluster copy is vendored separately from the prerequisite above and nobody has assessed its move; the two are at different versions as a result."
        }
      ]
    },
    {
      "name": "cert-manager-webhook-hetzner",
      "component": "cert-manager DNS-01 webhook",
      "description": "Proves domain ownership for certificates through the provider's DNS.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/hetzner/cert-manager-webhook-hetzner",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.9.0",
      "digests": [],
      "url": "https://github.com/hetzner/cert-manager-webhook-hetzner",
      "latest": "0.9.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A patch release behind, in a vendored render. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "cilium",
      "component": "Cilium",
      "description": "Container networking, network policy and the Gateway API implementation.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/cilium/cilium",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-bootstrap-templates"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.17.18",
      "digests": [
        "sha256:2f2c611db8de2f9c4846ee80fa3371617218dcd0cce42cf0d7d40b4d06458a23"
      ],
      "url": "https://github.com/cilium/cilium",
      "latest": "1.20.4",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The shipped release supports Kubernetes below 1.33, so it moves with Kubernetes rather than ahead of it. Upstream supports consecutive-minor upgrades only, and the delivered payload carries hand-applied patches that must be re-applied to any new render.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "operator-generic",
      "component": "Cilium",
      "description": "Container networking, network policy and the Gateway API implementation.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "quay.io/cilium/operator-generic",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-bootstrap-templates"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.17.18",
      "digests": [
        "sha256:ec68d574d2288f2d8cb0ae50778c1a0b08a6165cfcb6ba5bc5595d99ed3f7bda"
      ],
      "url": "https://github.com/cilium/cilium",
      "latest": "1.20.4",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The shipped release supports Kubernetes below 1.33, so it moves with Kubernetes rather than ahead of it. Upstream supports consecutive-minor upgrades only, and the delivered payload carries hand-applied patches that must be re-applied to any new render.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "cloudnative-pg",
      "component": "CloudNativePG",
      "description": "The database operator. Runs PostgreSQL clusters with backups and failover.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "ghcr.io/cloudnative-pg/cloudnative-pg",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.29.0",
      "digests": [],
      "url": "https://github.com/cloudnative-pg/cloudnative-pg",
      "latest": "1.30.1",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest release supports Kubernetes 1.34 to 1.36, above what the nodes run, so the operator waits on the Kubernetes move. 1.29.x is already out of upstream support.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "containerd",
      "component": "containerd",
      "description": "The container runtime on every node.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "pkg:containerd",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "burst-worker",
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "2.4.2",
      "digests": [],
      "url": "https://github.com/containerd/containerd",
      "latest": "2.4.2",
      "current": true
    },
    {
      "name": "coredns",
      "component": "CoreDNS",
      "description": "Cluster DNS.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/coredns/coredns",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.11.3",
      "digests": [],
      "url": "https://github.com/coredns/coredns",
      "latest": "1.15.0",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Not independently pinned. kubeadm chooses CoreDNS for the Kubernetes version in use, so this moves only when Kubernetes does.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "crossplane",
      "component": "Crossplane",
      "description": "Composition. Turns one declaration into the set of resources behind it.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "xpkg.crossplane.io/crossplane/crossplane",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.20.5",
      "digests": [],
      "url": "https://github.com/crossplane/crossplane",
      "latest": "2.4.3",
      "current": false,
      "behind": [
        {
          "status": "declined",
          "reason": "The newest release is a breaking major: it removes claims, so every composite definition has to be re-declared before the engine can move. Taking it is a migration of the definitions that provision clusters and tenant databases, not a version bump.",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "provider-kubernetes",
      "component": "Crossplane Kubernetes provider",
      "description": "Lets a composition create objects in any cluster the platform manages.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "xpkg.upbound.io/crossplane-contrib/provider-kubernetes",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.3.1",
      "digests": [],
      "url": "https://github.com/crossplane-contrib/provider-kubernetes",
      "latest": "1.4.1",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Crossplane: the provider line has to match the engine major, because the scope of its managed resources differs between them.",
          "blocked_by": "Crossplane"
        }
      ]
    },
    {
      "name": "provider-sql",
      "component": "Crossplane SQL provider",
      "description": "Creates application databases and roles inside the platform database.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "package",
      "cluster": "managed",
      "source": "xpkg.upbound.io/crossplane-contrib/provider-sql",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.14.0",
      "digests": [],
      "url": "https://github.com/crossplane-contrib/provider-sql",
      "latest": "0.16.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Crossplane, for the same managed-resource scope reason as the other provider.",
          "blocked_by": "Crossplane"
        }
      ]
    },
    {
      "name": "ephemeral-job-operator",
      "component": "Ephemeral job operator",
      "description": "Runs short-lived jobs on managed clusters.",
      "license": "Apache-2.0",
      "layer": "workload-infrastructure",
      "type": "container",
      "cluster": "managed",
      "source": "ghcr.io/soloz-io/ephemeral-job-operator",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:55970a56f8ab4a88ad55df16593164a9a6d2f94d110ec544034d3c611fa25828"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "c08a0d6f",
      "current": true
    },
    {
      "name": "etcd",
      "component": "etcd",
      "description": "The control plane's key-value store.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/etcd",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "3.5.15-0",
      "digests": [],
      "url": "https://github.com/etcd-io/etcd",
      "latest": "3.7.3",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Not independently pinned. kubeadm chooses etcd for the Kubernetes version in use, so this moves only when Kubernetes does and will not reach etcd's own newest release.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "external-secrets",
      "component": "External Secrets",
      "description": "Secret delivery. Copies each workload's secrets from the secret store into its namespace.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "ghcr.io/external-secrets/external-secrets",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v2.2.0",
      "digests": [],
      "url": "https://github.com/external-secrets/external-secrets",
      "latest": "2.14.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors. Nobody has assessed the move; the operator serves the API versions the platform's objects already use, so no object migration is expected."
        }
      ]
    },
    {
      "name": "external-dns",
      "component": "ExternalDNS",
      "description": "Publishes DNS records for every public hostname.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/external-dns/external-dns",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.15.0",
      "digests": [
        "sha256:338dd8c526e1337a12db0c8ee81a59ce5815ea51b73756affcd1e5dca530105c"
      ],
      "url": "https://github.com/kubernetes-sigs/external-dns",
      "latest": "0.24.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors, pinned as an image rather than installed from a chart. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "external-dns-hetzner-webhook",
      "component": "ExternalDNS provider webhook",
      "description": "Connects ExternalDNS to the provider's DNS service.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/hetzner/external-dns-hetzner-webhook",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.3.4",
      "digests": [
        "sha256:17d6d7f09b3419e27eb1abd4a4a0d7fddac84192a2c681e65c356056fc3a9253"
      ],
      "url": "https://github.com/hetzner/external-dns-hetzner-webhook",
      "latest": "0.5.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by two minors and paired with the DNS controller above. Nobody has assessed the move.",
          "blocked_by": "ExternalDNS"
        }
      ]
    },
    {
      "name": "alloy",
      "component": "Grafana Alloy",
      "description": "Collects metrics and logs on every node and cluster.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/grafana/alloy",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.20.1",
      "digests": [
        "sha256:2aa2099af76c0098d4af7a4d6e48f86cb66dc1a000222ad927a1c67c6542d13f"
      ],
      "url": "https://github.com/grafana/alloy",
      "latest": "1.21.3",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "A patch behind, in a vendored render. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "pki-issuer",
      "component": "Infisical PKI issuer",
      "description": "Issues internal certificates from the secret store's certificate authority.",
      "license": "MIT",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/infisical/pki-issuer",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.2.0",
      "digests": [],
      "url": "https://github.com/Infisical/infisical-issuer",
      "latest": "1.0.1",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "The newest release is a major. Nobody has assessed what it changes for the issuer the platform declares."
        }
      ]
    },
    {
      "name": "kube-state-metrics",
      "component": "kube-state-metrics",
      "description": "Exposes the state of Kubernetes objects as metrics.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/kube-state-metrics/kube-state-metrics",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v2.14.0",
      "digests": [
        "sha256:37d841299325c23b56e5951176ce8ef317d537447c0f1b2d2437dddbb1f51165"
      ],
      "url": "https://github.com/kubernetes/kube-state-metrics",
      "latest": "2.20.0",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Each release of this exporter is built against one Kubernetes client version, and the project supports only the pairing. The release matching the target Kubernetes is not the newest one, so this is capped by the Kubernetes destination rather than free to move.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubectl",
      "component": "kubectl",
      "description": "Runs one-off jobs against the cluster API.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/kubectl",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-bootstrap-templates"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "v1.31.6",
      "digests": [
        "sha256:0340f50e46e77889398f41becf071e8d0f6be7672652a30e209112002147c06f"
      ],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: this is the client the node bootstrap and init containers run, held within one minor of the API server.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kube-apiserver",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/kube-apiserver",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest policy engine release supports Kubernetes 1.33 to 1.35, and its webhooks gate every deployment, so the newest Kubernetes is not reachable while it is in the stack. 1.35.10 is the destination; 1.37.2 is not available at any policy-engine version.",
          "blocked_by": "Kyverno",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kube-controller-manager",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/kube-controller-manager",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest policy engine release supports Kubernetes 1.33 to 1.35, and its webhooks gate every deployment, so the newest Kubernetes is not reachable while it is in the stack. 1.35.10 is the destination; 1.37.2 is not available at any policy-engine version.",
          "blocked_by": "Kyverno",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kube-scheduler",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/kube-scheduler",
      "nodes": [
        "control-plane"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "v1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The newest policy engine release supports Kubernetes 1.33 to 1.35, and its webhooks gate every deployment, so the newest Kubernetes is not reachable while it is in the stack. 1.35.10 is the destination; 1.37.2 is not available at any policy-engine version.",
          "blocked_by": "Kyverno",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "pause",
      "component": "Kubernetes",
      "description": "The control plane kubeadm runs at the pinned Kubernetes version.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/pause",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "kubeadm"
      ],
      "boundaries": [],
      "via": [
        "kubeadm v1.31.6"
      ],
      "version": "3.10",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes/tree/master/build/pause",
      "latest": "3.10.2",
      "current": true
    },
    {
      "name": "kubeadm",
      "component": "Kubernetes node tools",
      "description": "kubelet runs the node's pods; kubeadm joins it to the cluster; kubectl is the command-line client.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "pkg:kubeadm",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "burst-worker",
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: kubelet, kubeadm and kubectl are installed from the repository the node's Kubernetes version names.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubectl",
      "component": "Kubernetes node tools",
      "description": "kubelet runs the node's pods; kubeadm joins it to the cluster; kubectl is the command-line client.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "pkg:kubectl",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "burst-worker",
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: kubelet, kubeadm and kubectl are installed from the repository the node's Kubernetes version names.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kubelet",
      "component": "Kubernetes node tools",
      "description": "kubelet runs the node's pods; kubeadm joins it to the cluster; kubectl is the command-line client.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "pkg:kubelet",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "burst-worker",
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.31.6",
      "digests": [],
      "url": "https://github.com/kubernetes/kubernetes",
      "latest": "1.37.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Kubernetes: kubelet, kubeadm and kubectl are installed from the repository the node's Kubernetes version names.",
          "blocked_by": "Kubernetes",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "background-controller",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "reg.kyverno.io/kyverno/background-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "cleanup-controller",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "reg.kyverno.io/kyverno/cleanup-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kyverno",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "reg.kyverno.io/kyverno/kyverno",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "kyvernopre",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "reg.kyverno.io/kyverno/kyvernopre",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "reports-controller",
      "component": "Kyverno",
      "description": "Admission policy. Enforces the platform's rules on everything a cluster admits.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "reg.kyverno.io/kyverno/reports-controller",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.19.1",
      "digests": [],
      "url": "https://github.com/kyverno/kyverno",
      "latest": "1.19.2",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "A patch release behind. The version is load-bearing for the Kubernetes destination, so it moves deliberately rather than with routine bumps; 1.19.2 is the newest of the line that supports the target Kubernetes.",
          "target": "0.1.16-rc.189",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "loki",
      "component": "Loki",
      "description": "Log storage and search.",
      "license": "AGPL-3.0-only",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/grafana/loki",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "3.7.9",
      "digests": [
        "sha256:0db216b630ae1f348a1584c67f3cead8b4c1fc839169a39501db664744158e28"
      ],
      "url": "https://github.com/grafana/loki",
      "latest": "3.7.9",
      "current": true
    },
    {
      "name": "nginx-unprivileged",
      "component": "NGINX",
      "description": "Serves static pages and public assets.",
      "license": "BSD-2-Clause",
      "layer": "workload-infrastructure",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/nginxinc/nginx-unprivileged",
      "nodes": [
        "worker"
      ],
      "where": [
        "universal-tenant"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.27-alpine",
      "digests": [
        "sha256:65e3e85dbaed8ba248841d9d58a899b6197106c23cb0ff1a132b7bfe0547e4c0"
      ],
      "url": "https://github.com/nginx/nginx",
      "latest": "1.31.8",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors, in a vendored chart's values. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "k8s-dns-node-cache",
      "component": "NodeLocal DNSCache",
      "description": "A DNS cache on every node.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "registry.k8s.io/dns/k8s-dns-node-cache",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.23.1",
      "digests": [],
      "url": "https://github.com/kubernetes/dns",
      "latest": "1.26.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors, pinned in a hand-assembled manifest on both the management and managed clusters. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "function-patch-and-transform",
      "component": "Patch and transform function",
      "description": "The composition function the platform's compositions are written in.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v0.8.0",
      "digests": [],
      "url": "https://github.com/crossplane-contrib/function-patch-and-transform",
      "latest": "0.11.2",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Waits on Crossplane: composition functions are resolved by the engine, so the function moves with it.",
          "blocked_by": "Crossplane"
        }
      ]
    },
    {
      "name": "postgresql",
      "component": "PostgreSQL",
      "description": "The platform database and each application's database.",
      "license": "PostgreSQL",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "ghcr.io/cloudnative-pg/postgresql",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "16.2",
      "digests": [],
      "url": "https://github.com/postgres/postgres",
      "latest": "18.6",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The shared managed-cluster store serves tenant applications, which do not select their own major, so it moves only when a major is known good for every consumer on the box.",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "redis",
      "component": "Redis",
      "description": "The platform cache.",
      "license": "BSD-3-Clause (7.x); AGPL-3.0-only (8.x)",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/library/redis",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-bootstrap-templates"
      ],
      "boundaries": [
        "03"
      ],
      "via": [],
      "version": "7.2-alpine",
      "digests": [],
      "url": "https://github.com/redis/redis",
      "latest": "8.10.3",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: three different versions of the same cache ship in one release, from separate manifests that were never reconciled. They converge on one version in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "reloader",
      "component": "Reloader",
      "description": "Restarts a workload when a secret or config map it reads changes.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "ghcr.io/stakater/reloader",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.2.1",
      "digests": [
        "sha256:e989909133e9fa2b0e69d814b7d1f313696b626a54e3e9b53626f3d968cf15c8"
      ],
      "url": "https://github.com/stakater/Reloader",
      "latest": "1.4.23",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by several minors. Nobody has assessed the move."
        }
      ]
    },
    {
      "name": "runc",
      "component": "runc",
      "description": "The low-level runtime containerd starts containers with.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "pkg:runc",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "burst-worker",
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.5.2",
      "digests": [],
      "url": "https://github.com/opencontainers/runc",
      "latest": "1.5.2",
      "current": true
    },
    {
      "name": "support-agent",
      "component": "Support agent",
      "description": "Reports allowlisted control-plane facts when an organization enrols. Does nothing until then.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "container",
      "cluster": "managed",
      "source": "ghcr.io/soloz-io/zero-ops/support-agent",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [],
      "version": "digest-pinned",
      "digests": [
        "sha256:b0522975b8305072ef0a765329467c4f1719da4feba5b7151915c0147fb23541"
      ],
      "url": "https://github.com/soloz-io/zero-ops",
      "latest": "c08a0d6f",
      "current": false,
      "behind": [
        {
          "status": "scheduled",
          "reason": "DEFECT, not a hold: this release ships the 2026-09-13 build. A later build exists, but the commit that pins it back into the deployment never landed, so the newer image was published and never shipped. The pin-back lands in the next release.",
          "target": "0.1.16-rc.189"
        }
      ]
    },
    {
      "name": "tailscale",
      "component": "Tailscale",
      "description": "Joins the node to the tailnet when a tailnet hostname is configured for it.",
      "license": "BSD-3-Clause",
      "layer": "machinery",
      "type": "package",
      "cluster": "managed",
      "source": "pkg:tailscale",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "burst-worker",
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "1.104.4",
      "digests": [],
      "url": "https://github.com/tailscale/tailscale",
      "latest": "1.104.4",
      "current": true
    },
    {
      "name": "ubuntu",
      "component": "Ubuntu",
      "description": "The node operating system, the provider's stock image.",
      "license": "Per package; see /usr/share/doc/<package>/copyright on the node",
      "layer": "machinery",
      "type": "os",
      "cluster": "managed",
      "source": "os:ubuntu",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "burst-worker",
        "control plane",
        "default-worker"
      ],
      "boundaries": [],
      "via": [],
      "version": "24.04",
      "digests": [],
      "url": "https://launchpad.net/ubuntu",
      "latest": "26.04",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "The node image is the provider's own published system image, named by the exact string the provider uses. Whether the newest release is published in the cloud catalogue, and under what name, is not readable without provider credentials and has not been confirmed. The newest image may also be built for a narrower processor baseline than the machine types in use, which is a separate question from availability.",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    },
    {
      "name": "victoria-metrics",
      "component": "VictoriaMetrics",
      "description": "The metrics store, rule evaluation and the authenticating proxy in front of them, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/victoriametrics/victoria-metrics",
      "nodes": [
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v1.152.0",
      "digests": [],
      "url": "https://github.com/VictoriaMetrics/VictoriaMetrics",
      "latest": "1.155.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by three patch releases, in a vendored render whose values are recorded in prose rather than a values file, so re-rendering has to be reconstructed before it can be trusted."
        }
      ]
    },
    {
      "name": "vmalert",
      "component": "VictoriaMetrics",
      "description": "The metrics store, rule evaluation and the authenticating proxy in front of them, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/victoriametrics/vmalert",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v1.152.0",
      "digests": [],
      "url": "https://github.com/VictoriaMetrics/VictoriaMetrics",
      "latest": "1.155.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by three patch releases, in a vendored render whose values are recorded in prose rather than a values file, so re-rendering has to be reconstructed before it can be trusted."
        }
      ]
    },
    {
      "name": "vmauth",
      "component": "VictoriaMetrics",
      "description": "The metrics store, rule evaluation and the authenticating proxy in front of them, run by the VictoriaMetrics operator.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/victoriametrics/vmauth",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "v1.152.0",
      "digests": [],
      "url": "https://github.com/VictoriaMetrics/VictoriaMetrics",
      "latest": "1.155.0",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Behind by three patch releases, in a vendored render whose values are recorded in prose rather than a values file, so re-rendering has to be reconstructed before it can be trusted."
        }
      ]
    },
    {
      "name": "operator",
      "component": "VictoriaMetrics operator",
      "description": "Runs the metrics stores.",
      "license": "Apache-2.0",
      "layer": "capability",
      "type": "container",
      "cluster": "managed",
      "source": "docker.io/victoriametrics/operator",
      "nodes": [
        "control-plane",
        "worker"
      ],
      "where": [
        "platform-spoke-catalog"
      ],
      "boundaries": [],
      "via": [
        "VictoriaMetrics operator v0.75.0"
      ],
      "version": "config-reloader-v0.75.0, v0.75.0",
      "digests": [
        "sha256:78da26b41a819093707be2ab6a65a5dc19f43d58ec52f30b49a545c2c6b7bd55"
      ],
      "url": "https://github.com/VictoriaMetrics/operator",
      "latest": "0.75.2",
      "current": false,
      "behind": [
        {
          "status": "not assessed",
          "reason": "Two patch releases behind, in the same vendored render as the stores. The operator and its config reloader move together because one render produces both."
        }
      ]
    },
    {
      "name": "clusterctl",
      "component": "Cluster API",
      "description": "Declarative cluster lifecycle. Creates, scales and replaces the management cluster and managed clusters.",
      "license": "Apache-2.0",
      "layer": "machinery",
      "type": "binary",
      "cluster": "bootstrap",
      "source": "tool:clusterctl",
      "nodes": [],
      "where": [
        "soloz CLI"
      ],
      "boundaries": [],
      "via": [],
      "version": "v1.10.0",
      "digests": [],
      "url": "https://github.com/kubernetes-sigs/cluster-api",
      "latest": "1.14.3",
      "current": false,
      "behind": [
        {
          "status": "held",
          "reason": "Capped by the infrastructure provider, whose current line is tested against Cluster API 1.13 and below. The newest Cluster API is unreachable until that provider ships its next line.",
          "blocked_by": "Cluster API provider for Hetzner",
          "ref": "docs/plans/k8s-cnpg-upgrade-and-restore-drill.md"
        }
      ]
    }
  ],
  "previous": "0.1.16-rc.187",
  "changes": [],
  "released": "2026-11-02T13:09:38Z"
};
