import _ from 'lodash';

/**
 * Map classes of the current module
 * and combine them with other class names
 * (moduleClasses + defaultProps.className)
 *
 * @param {Object} props - component props
 * @param {Object} styleModule - imported css module object
 *
 * @param {Array} props.moduleClasses - array with strings(classNames) that rely to styleModule
 * @param {String} props.defaultProps.className - any classes that not necessarily rely to styleModule
 *
 * @return {String}
 */
export function combineClassNames(props, styleModule) {
	const moduleClassesArray = _.map(props.moduleClasses, moduleClass => styleModule[moduleClass]);
	const classNames = _.get(props, 'defaultProps.className', '');
	const classNamesArray = classNames.split(' ');

	return [...moduleClassesArray, ...classNamesArray].join(' ');
}
