import * as css from 'src/styles/_vars.scss';

export const DESKTOP = css.desktop;
export const NON_DESKTOP = css.nonDesktop;
export const IPAD_LANDSCAPE = css.iPad_landscape;
export const TABLET = css.tablet;
export const TABLET_PORTRAIT = css.tabletPortrait;
export const MOBILE = css.mobile;
export const MOBILE_LANDSCAPE = css.mobileLandscape;
export const NON_MOBILE = css.nonMobile;

export const isMatching = query => window.matchMedia(query).matches;
export const isMobile = () => isMatching(MOBILE);
export const isTablet = () => isMatching(TABLET);
export const isTabletPortrait = () => isMatching(TABLET_PORTRAIT);
