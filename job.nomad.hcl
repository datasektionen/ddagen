job "ddagen" {
  type = "service"
  namespace = "ddagen"

  group "ddagen" {
    network {
      port "http" { }
    }

    service {
      name     = "ddagen"
      port     = "http"
      provider = "nomad"
      tags = [
        "traefik.enable=true",
        "traefik.http.routers.ddagen.rule=Host(`ddagen.se`)||Host(`www.ddagen.se`)",
        "traefik.http.routers.ddagen.tls.certresolver=default",
      ]
    }

    task "ddagen" {
      driver = "docker"

      config {
        image = var.image_tag
        ports = ["http"]
      }

      template {
        data        = <<ENV
PORT={{ env "NOMAD_PORT_http" }}
{{ with nomadVar "nomad/jobs/ddagen" }}
DATABASE_URL=postgres://ddagen:{{ .db_password }}@postgres.dsekt.internal:5432/ddagen
SPAM_API_KEY={{ .spam_api_key }}
{{ end }}
NODE_ENV=production
PLS_URL=http://pls.nomad.dsekt.internal
SPAM_URL=https://spam.datasektionen.se/api/sendmail
ENV
        destination = "local/.env"
        env         = true
      }

      resources {
        memory = 1024
        cpu    = 200
      }
    }
  }
}

variable "image_tag" {
  type = string
  default = "ghcr.io/datasektionen/ddagen:latest"
}
