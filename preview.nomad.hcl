job "ddagen-dev" {
  type = "service"
  namespace = "ddagen"

  group "ddagen-dev" {
    network {
      port "http" { }
    }

    service {
      name     = "ddagen-dev"
      port     = "http"
      provider = "nomad"
      tags = [
        "traefik.enable=true",
        "traefik.http.routers.ddagen-dev.rule=Host(`dev.ddagen.se`)",
        "traefik.http.routers.ddagen-dev.tls.certresolver=default",
      ]
    }

    task "ddagen-dev" {
      driver = "docker"

      config {
        image = var.image_tag
        ports = ["http"]
      }

      template {
        data        = <<ENV
PORT={{ env "NOMAD_PORT_http" }}
{{ with nomadVar "nomad/jobs/ddagen-dev" }}
DATABASE_URL=postgres://ddagen-dev:{{ .db_password }}@postgres.dsekt.internal:5432/ddagen-dev
SPAM_API_KEY={{ .spam_api_key }}
{{ end }}
NODE_ENV=production
PLS_URL=http://pls.nomad.dsekt.internal
SPAM_URL=https://spam.datasektionen.se/api/sendmail
ENV
        destination = "local/.env"
        env         = true
      }
    }
  }
}

variable "image_tag" {
  type = string
  default = "ghcr.io/datasektionen/ddagen:preview"
}
