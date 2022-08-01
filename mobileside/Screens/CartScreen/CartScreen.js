import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  // Button,
} from 'react-native';
import {
  Container,
  Heading,
  Box,
  List,
  Avatar,
  Image,
  Center,
  Button,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as actions from '../../Redux/actions/cartAction';

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import CartList from './CartList';
const CartScreen = props => {
  const {cartItems, clearCart, navigation} = props;
  let total = 0;
  cartItems.forEach(cart => {
    console.log('cart', cart);
    let cpip = cart?.product?.item?.price;
    return (total += cpip || cart?.price);
  });
  return (
    <>
      {cartItems.length ? (
        <>
          <Container>
            <Heading size="md" style={{alignSelf: 'center'}}>
              Cart
            </Heading>
            <ScrollView style={{width: width - 10, height: height - 218}}>
              {props?.cartItems?.map(data => {
                console.log('data', data);
                const item = data;
                // const {item} = data?.product;
                return (
                  <>
                    <CartList item={item} />
                  </>
                );
              })}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',

                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundColor: 'white',
                // elevation: 50,
              }}>
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  width: width,
                  left: 0,
                  backgroundColor: 'white',
                  elevation: 20,
                }}>
                <Center rounded="sm">
                  <Text style={{fontSize: 20, color: 'red'}}>${total}</Text>
                </Center>
                <Box style={{flexDirection: 'row'}}>
                  <Button
                    onPress={() => {
                      props.clearCart();
                    }}
                    style={{
                      margin: 5,
                    }}>
                    Clear
                  </Button>
                  <Button
                    style={{
                      margin: 5,
                    }}
                    onPress={() => {
                      console.log('navigation.navigate', navigation);
                      navigation.navigate('CartCheckoutTab', {
                        total: total,
                        // clearCart: props.clearCart(),
                      });
                    }}>
                    CheckOut
                  </Button>
                </Box>
              </Box>
            </View>
          </Container>
        </>
      ) : (
        <>
          <Container style={styles.cartEmpty}>
            <Text>Looks Like Your Cart is empty</Text>
            <Text>Add some products to your Cart to get Started</Text>
          </Container>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeCart: item => dispatch(actions.RemoveFromCart(item)),
  };
};
const styles = StyleSheet.create({
  cartEmpty: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  list: {
    borderWidth: 0,
    width: width - 10,
    margin: 5,
    flexDirection: 'row',
    // height: height,
  },
  // image: {
  //   width: width / 2,
  //   height: 120,
  // },
});
// export default CartScreen;
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
