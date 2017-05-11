cd ..
rm -f FairyDict.zip
zip -x '*build/*' -x '*readme_images/*' -x '*.git*' -x '*/test/*' -x '*.less' -x '*.coffee' -x '*.scss' -r FairyDict.zip  FairyDict/
