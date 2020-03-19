#!bin/sh
#components,containers以下のjsファイルについて、testファイルをtouchする
find ./components -name "*.js" | sed "s/\.js/.test.js/g" | sed "s/components/components\/tests/g"| xargs touch
find ./containers -name "*.js" | sed "s/\.js/.test.js/g" | sed "s/containers/containers\/tests/g"| xargs touch