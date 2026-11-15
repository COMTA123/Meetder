#เลือก base image
FROM node:20-alpine

#ตั้งค่า working directory ใน image
WORKDIR /app

#คัดลอกไฟล์ที่จำเป็น libary และติดตั้ง
COPY package*.json ./
RUN npm ci --omit=dev

#คัดลอกโค้ดทั้งหมด
COPY . .

#คำสั่งรันเมื่อ container ทำงาน
EXPOSE 3000
CMD ["node", "index.js"]
