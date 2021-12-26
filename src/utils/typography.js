import Typography from 'typography'
import theme from 'typography-theme-wordpress-2015';

theme.overrideThemeStyles = ({ rhythm }, options) => {
  return {
    'ul, ol': {
      marginLeft: rhythm(1),
    },
    'code': {
      fontSize: `0.9em`
    },
    'blockquote': {
      fontSize: `0.9em`,
      marginLeft: rhythm(.5),
      borderLeft: '6px solid #ffc107'
    },
    'h1,h2,h3': {
      lineHeight: rhythm(1.4),
    }
  };
};

const typography = new Typography(theme);

export default typography
