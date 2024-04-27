import { utilsCommon } from '~/utils/utilsCommon';
import { utilsRender } from '~/utils/utilsRender';

export default () => ({
  ...utilsCommon(),
  ...utilsRender(),
});
