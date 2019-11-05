cd ..
rm -f FairyDict.zip
zip -x '*.DS_Store*' -x '*build/*' -x '*readme_images/*' -x '*node_modules/*' -x '*.git*' -x '*/test/*' -x '*.less' -x '*.coffee' -x '*.scss' -r FairyDict.zip  FairyDict/
