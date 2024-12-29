import {StyleSheet, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

interface RowContainerProps {
  style?: object;
  marginTop?: boolean;
  children: React.ReactNode;
}

export const RowContainer: React.FC<RowContainerProps> = props => {
  return (
    <View
      style={[
        styles.container,
        props.style,
        props.marginTop && {marginTop: 10},
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

RowContainer.propTypes = {
  marginTop: PropTypes.bool,
};
