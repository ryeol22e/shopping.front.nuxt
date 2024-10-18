export default () => {
  const { isMobile, isDesktop, isIos, isAndroid } = useDevice();
  let device = 'pc';

  if (isMobile) {
    device = 'mobile';

    if (isIos) {
      device = 'ios';
    } else if (isAndroid) {
      device = 'aos';
    }
  }

  return {
    device,
  };
};
