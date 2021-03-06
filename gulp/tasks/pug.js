import {
	src,
	watch,
	lastRun,
	dest,
} from 'gulp';
import pug from 'gulp-pug';
// import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import config from '../config';

export const pugBuild = () => (
	src(`${config.src.pug}/*.pug`)
	.on('error', function browerifyError(error) {
		console.log(error.stack);
		this.emit('end');
	})
	.pipe(pug({
		pretty: true,
	}))
	.pipe(dest(`${config.dest.html}`))
	.pipe(browserSync.stream())
);

export const pugWatch = () => watch(`${config.src.pug}/**/*.pug`, pugBuild);