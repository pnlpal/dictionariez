name="dictionaries.zip"
srcname="dictionaries-src.zip" 

npm run build

rm -f ${name}
rm -f ${srcname}

echo "pack to ${name}: "
cd build/
zip -r ${name} . 
mv ${name} ../
cd ../

echo
echo "pack to ${srcname}: "
zip -x '*.DS_Store*' -x '*build/*' -x '*readme_images/*' -x '*.git*' -x 'test/*' -x 'node_modules/*' -x "bower_components/*" -x "build.*" -x "${name}" -r ${srcname} .