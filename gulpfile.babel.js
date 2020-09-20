import { parallel } from 'gulp';

import { styles } from './gulp.styles';

export const dev = parallel( styles );

export default dev;