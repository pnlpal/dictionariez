set -e # Exit on error

scp -P 4500 ../src/vendor/github-badge.js ../readme_images/screenshot* ../readme_images/Dictionariez-promo-1280x640.png ../src/images/library-64.png *.js *.css index.html river@167.172.46.156:~/pnlpal/dictionariez-landing-page

ssh -p 4500 river@167.172.46.156 "sudo cp ~/pnlpal/dictionariez-landing-page/* /usr/share/nginx/html/dictionariez-landing-page -r"
