#!/bin/bash

# หยุด container
docker stop class-record-front

# ลบ container
docker rm class-record-front

# รัน container จาก image ใหม่ที่สร้างขึ้น
docker run --name class-record-front -d -p 8082:8080 -p 8445:8443 -v /var/project/classroom-record/class-record-front:/app bitnami/apache:latest

# สั่ง container รีสตาทอัตโนมัติทุกครั้ง
docker update --restart always class-record-front