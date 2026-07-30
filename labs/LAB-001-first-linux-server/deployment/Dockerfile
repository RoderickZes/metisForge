# Metis Forge - LAB-001 - First Linux Server
# Entorno de ejecucion para Quick Mode (Docker).
#

FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive


RUN dpkg-divert --remove --rename /usr/bin/man \
    && sed -i '/\/usr\/share\/man/d' /etc/dpkg/dpkg.cfg.d/excludes

RUN apt-get update \
    && apt-get install -y --reinstall $(dpkg -l | awk '/^ii/{print $2}') \
    && apt-get install -y --no-install-recommends \
        sudo \
        man-db \
        manpages \
        procps \
        iproute2 \
        net-tools \
        iputils-ping \
        openssh-server \
        rsyslog \
    && rm -rf /var/lib/apt/lists/*


RUN useradd --create-home --shell /bin/bash alumno \
    && usermod -aG sudo alumno \
    && echo "alumno ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/alumno

RUN mkdir -p /run/sshd

WORKDIR /home/alumno
USER alumno

CMD ["sleep", "infinity"]