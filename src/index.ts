interface ISize {
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  borderLeftWidth: number;
  borderRightWidth: number;
  borderTopWidth: number;
  borderBottomWidth: number;
}

const measurements: Array<String | number | null> = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
];

interface INewSize extends ISize {
  width: any;
  height: any;
  isBorderBox: boolean;
}

/**
 *
 * @param value string
 * @example
 *   correct: getStyleSize('100')
 *   wrong: getStyleSize(100)
 *   wrong: getStyleSize('100%')
 * @returns boolean
 */
export function getStyleSize(value: string) {
  const num = parseFloat(value);
  // not a percent like '100%', and a number
  const isValid = !value.includes('%') && !isNaN(num);
  return isValid && num;
}

export function getZeroSize() {
  const size: ISize = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  };

  return size;
}

export default function getSize(elem: HTMLElement | null | any) {
  if (typeof document === 'undefined') {
    throw new Error('document-ready only runs in the browser');
  }

  // use querySelector if elem is string
  if (typeof elem === 'string') {
    elem = document.querySelector(elem);
  }

  // do not proceed on non-objects
  let isElement = elem && typeof elem == 'object' && elem.nodeType;
  if (!isElement) return;

  let style = getComputedStyle(elem);

  // if hidden, everything is 0
  if (style.display === 'none') return getZeroSize();

  const isBorderBox = style.boxSizing === 'border-box';
  const size: INewSize | any = {};

  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;
  size.isBorderBox = isBorderBox;

  measurements.forEach((measurement: any) => {
    const value = style[measurement];
    const num = parseFloat(value);
    // any 'auto', 'medium' value will be 0
    size[measurement] = !isNaN(num) ? Math.round(num) : 0;
  });

  let paddingWidth = size.paddingLeft + size.paddingRight;
  let paddingHeight = size.paddingTop + size.paddingBottom;
  let marginWidth = size.marginLeft + size.marginRight;
  let marginHeight = size.marginTop + size.marginBottom;
  let borderWidth = size.borderLeftWidth + size.borderRightWidth;
  let borderHeight = size.borderTopWidth + size.borderBottomWidth;

  // overwrite width and height if we can get it from style
  let styleWidth = getStyleSize(style.width);
  if (styleWidth !== false) {
    size.width =
      styleWidth +
      // add padding and border unless it's already including it
      (isBorderBox ? 0 : paddingWidth + borderWidth);
  }
  console.log(size.width, paddingWidth + borderWidth);

  let styleHeight = getStyleSize(style.height);
  if (styleHeight !== false) {
    size.height =
      styleHeight +
      // add padding and border unless it's already including it
      (isBorderBox ? 0 : paddingHeight + borderHeight);
  }

  size.innerWidth = size.width - (paddingWidth + borderWidth);
  size.innerHeight = size.height - (paddingHeight + borderHeight);

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}
