import { Vessel, IceCreamBlock } from './constructors';

$(document).ready(() => {
  console.log('jquery loaded');

  const ic = new IceCreamBlock();

  console.log(ic.scoop());
});
