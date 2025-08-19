const {src, dest, parallel} = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
function imagenes(done) {
   const opciones = {
       optimizationLevel: 3
   }
   src('src/img/**/*.{png,jpg}')
       .pipe( cache( imagemin(opciones) ) )
       .pipe( dest('build/img') )
   done();
}

function versionWebp( done ) {
   const opciones = {
       quality: 50
   };
   src('src/img/**/*.{png,jpg}')
       .pipe( webp(opciones) )
       .pipe( dest('build/img') )
   done();
}
//function versionAvif( done ) {
//   const opciones = {
//       quality: 50
//   };
//   src('src/img/**/*.{png,jpg}')
//       .pipe( avif(opciones) )
//       .pipe( dest('build/img') )
//   done();
//}
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
/* exports.versionAvif = versionAvif; */
exports.optimizacion = parallel(imagenes,versionWebp);

//(THIS WHOLE OPTIMIZATION WILL ONLY WORK WITH THE PACKEGES.JSON PROVIDED MAINLY BEACUSE OF THE VERSIONS OF GULP)
//BE CAREFULL DONT DELETE GULP IN TERMINAL BECAUSE IT WILL MODIFIY THE json packages INSTEAD DELETE node_modules folder
//TO FUCKIN MAKE IT WORK npm install in TERMINAL (You need to have package.json and package-lock.json)
//Then have a src/img folder like it says above in src to put images you want to optimize
//npx gulp optimizacion in TERMINAL
//You will see optimized images on build\img