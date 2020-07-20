import Typography from "typography"
import theme from 'typography-theme-wordpress-2015';

theme.overrideThemeStyles = ({ rhythm }, options) => {
  return {
    'ul, ol': {
      marginLeft: rhythm(1),
    },
    'code': {
      fontSize: `0.9em`
    }
  };
};

const typography = new Typography(theme);

export default typography
