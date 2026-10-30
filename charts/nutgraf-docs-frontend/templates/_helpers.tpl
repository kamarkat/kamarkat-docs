{{/*
The workload's name, and it is NOT free.

The app's AgentGateway serves / from
  frontend-workload.<namespace>.svc.cluster.local:3000
derived in the platform's own chart rather than read from any tenant value.
Renaming this does not error: the gateway keeps answering and every page load
returns 503, because the backend it resolves no longer exists.
*/}}
{{- define "nutgraf-docs-frontend.workload" -}}frontend-workload{{- end -}}

{{- define "nutgraf-docs-frontend.selectorLabels" -}}
app: frontend
{{- end -}}

{{- define "nutgraf-docs-frontend.labels" -}}
{{ include "nutgraf-docs-frontend.selectorLabels" . }}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
workload-class: stateless-web
tenant-id: {{ .Values.tenantId }}
app-id: {{ .Values.appId }}
cost-center: {{ .Values.costCenter }}
{{- end -}}

{{/*
Joined with @: the spoke's Kyverno policy admits only `*@sha256:*` images.
*/}}
{{- define "nutgraf-docs-frontend.image" -}}
{{- $ref := .Values.image.digest | default .Chart.AppVersion -}}
{{- printf "%s@%s" .Values.image.repository $ref -}}
{{- end -}}
