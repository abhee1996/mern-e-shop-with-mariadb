import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../config/colors';

const AdminScreen = props => {
  return (
    <View>
      <View style={styles.admin}>
        <Text style={{fontSize: 24, fontWeight: '500'}}>Admin Screen</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AppIconButton
          title="My Products"
          leftIcon={true}
          iconAs="FontAwesome"
          name="shopping-bag"
          iconColor={colors.default.orange}
          size={45}
          width={40}
          height={114}
          marginX="3%"
          marginY="1%"
          borderRadius={10}
          buttonBgColor={colors.primarypro.primary500}
          txtColor={colors.default.white}
          onPress={() => props.navigation.navigate('AdminProducts')}
        />
        <View>
          <AppIconButton
            title="Orders"
            leftIcon={true}
            iconAs="FontAwesome"
            name="shopping-cart"
            onPress={() => props.navigation.navigate('AdminOrders')}
            size={45}
            iconColor={colors.rose.rose800}
            width={40}
            height={114}
            marginX="3%"
            marginY="1%"
            borderRadius={10}
            // buttonStyle={styles.orderDubbleIconStyle}
            buttonBgColor={colors.primarypro.primary500}
            txtColor={colors.default.white}
          />
        </View>

        <AppIconButton
          title="Products"
          leftIcon={true}
          iconAs="FontAwesome"
          name="plus"
          onPress={
            () => props.navigation.navigate('AdminProductForm')
            // {
            //   productItem: productList,
            // })
          }
          size={35}
          iconColor={colors.greenteal.teal800}
          width={40}
          height={114}
          marginX="3%"
          marginY="1%"
          borderRadius={10}
          buttonBgColor={colors.primarypro.primary500}
          txtColor={colors.default.white}
        />
        <AppIconButton
          title="Categories"
          leftIcon={true}
          iconAs="MaterialIcons"
          name="category"
          onPress={() => props.navigation.navigate('AdminCategories')}
          size={45}
          iconColor={colors.indigopro.indigo600}
          width={40}
          height={114}
          marginX="3%"
          marginY="1%"
          borderRadius={10}
          buttonBgColor={colors.primarypro.primary500}
          txtColor={colors.default.white}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  admin: {
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  orderDubbleIconStyle: {
    margin: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MarkIconStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 42,
    right: 10,
  },
});
export default AdminScreen;
