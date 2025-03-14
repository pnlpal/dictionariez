browser="${BROWSER:-Chrome}"
product="${PRODUCT:-Dictionariez}"
name="${product}_${browser}.zip"
srcname="${product}-src_${browser}.zip" 

PRODUCT=${product} BROWSER=${browser} npm run build

rm -f ${name}
rm -f ${srcname}

echo "pack to ${name}: "
cd build/
zip -r ${name} . 
mv ${name} ../
cd ../

echo
echo "pack to ${srcname}: "
zip -x '*.DS_Store*' -x '*build/*' -x '*readme_images/*' -x '*.git*' -x '*.zip' -x 'test/*' -x 'node_modules/*' -x "bower_components/*" -x "build.*" -x "${name}" -r ${srcname} .