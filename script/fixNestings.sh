#!/bin/bash
# Author: Flatmax developers
# Date : 2018 10 17
# License : free

# The following function will remove nested directories, where $1 exists like so
# node_modules/.*/node_modules/$1
# @param $1 the module name to remove nestings of
function rmNestedMod(){
  name=$1
  paths=`find -L node_modules -name $1 | sed "s|^node_modules/||;s|/\$name$||" | grep node_modules`
  for p in $paths; do
    echo rm -rf node_modules/$p/$name
    rm -rf node_modules/$p/$name
  done
}

# remove all nested polymer modules in the polymer namespace
namespaces=`ls node_modules/@polymer/`
for n in $namespaces; do
  rmNestedMod "$n"
done