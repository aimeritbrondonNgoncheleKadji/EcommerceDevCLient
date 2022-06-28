import PropTypes from 'prop-types';

export const articleDataPropType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })
);

export const articlePropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  fileUrl: PropTypes.string,
  data: articleDataPropType,
});

export const articlesPropType = PropTypes.arrayOf(articlePropType);
