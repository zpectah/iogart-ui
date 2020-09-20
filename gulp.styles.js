import { src, dest } from 'gulp';

import cfg from './config';

import gulpStylus from 'gulp-stylus';
import gulpCleanCss from 'gulp-clean-css';
import gulpSourceMaps from 'gulp-sourcemaps';
import gulpRename from 'gulp-rename';

const options = {
    cleanCss: {
        "compatibility": "ie9"
    },
    rename: {
        "suffix": ".min"
    }
};

export function styles ( cb ) {
    let so, sm;
    src( cfg.PATH.SRC + 'index.styl' )
        // TODO .pipe( cfg.CREATE_SOURCEMAPS ? gulpSourceMaps.init( {} ) : true )
        .pipe( gulpStylus( {} ) )
        .pipe( dest( cfg.PATH.DIST ) )
        .pipe( gulpCleanCss( options.cleanCss, ( details ) => {
            so = details.stats.originalSize / 1000;
            sm = details.stats.minifiedSize / 1000;
            console.log( `Styles: ${so}kb -> ${sm}kb` )
        } ) )
        .pipe( gulpRename( options.rename ) )
        // TODO .pipe( cfg.CREATE_SOURCEMAPS ? gulpSourceMaps.write() : true )
        .pipe( dest( cfg.PATH.DIST ) );
    cb();
}