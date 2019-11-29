#!/bin/bash
# Author: Flatmax developers
# Date : 2018 10 17
# License : free

npm i --ignore-scripts || true
if [ `ls node_modules/ | wc -l` -eq "0" ]; then
  zenity --error --text="ERROR : cb() never called\nrm node_modules and pacakge-lock.json and try again"
fi
npm i --ignore-scripts || true
if [ `ls node_modules/ | wc -l` -eq "0" ]; then
  zenity --error --text="ERROR : cb() never called\nrm node_modules and pacakge-lock.json and try again"
fi
bash script/fixNestings.sh