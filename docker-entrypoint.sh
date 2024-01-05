#!/usr/bin/env bash

/etc/init.d/nginx start
cd /app/code
npm run start