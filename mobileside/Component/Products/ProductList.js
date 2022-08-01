// import {ScrollView} from 'native-base';
import {Box} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Badge, List} from 'native-base';

import Banner from '../Banner/Banner';
import Screen from '../Screen';
import ProductCarts from './ProductCarts';
// import {category} from '../../assets/data.json';
import Categories from '../../Component/Categories/Categories';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {getCategories} from '../../Redux/actions/categoryAction';
let {width, height} = Dimensions.get('window');
const ProductList = props => {
  const context = useContext(AuthGlobal);
  console.log('ProductCarts context', context?.shopValue?.shopId);
  const ShopId = context?.shopValue?.shopId;
  const ShopUUId = context?.shopValue?.shop_uuid;
  const UserId = context?.userValue?.userId;
  const {item, categories, setCategories, productImage} = props;
  const [productCat, setProductCat] = useState([]);
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState(item);
  useEffect(() => {
    // setCategories(category);
    getCategories(setCategories);
    console.log('getCategories(setCategories);', categories);
    setProductCat(item);
  }, []);

  const categoryFilter = catg => {
    console.log('catg', catg);
    console.log(
      'first filter',
      categories.filter(itm => itm.id === catg),
    );
    {
      catg === 'all'
        ? [setProductCat(item), setActive(true)]
        : [categories.filter(itm => itm.id === catg), setActive(true)];
    }
  };
  return (
    <>
      <Screen
        style={{
          width: width,
          backgroundColor: 'gainsboro',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View>
            <Banner />
          </View>
          <View
            key={2}
            style={{
              marginVertical: 10,
              marginHorizontal: 15,
            }}>
            <Categories
              category={categories}
              categories={categories}
              setCategories={setCategories}
              categoryFilter={categoryFilter}
              productCat={productCat}
              active={active}
              setActive={setActive}
            />
          </View>

          <View style={{flex: 1, height: height}}>
            <Text
              style={{
                fontSize: 30,
                paddingTop: 10,
                alignSelf: 'center',
              }}>
              All Products
            </Text>
            <ScrollView nestedScrollEnabled={true}>
              <Pressable>
                <View
                  style={{
                    width: width,
                    backgroundColor: 'gainsboro',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    // justifyContent: 'center',
                  }}>
                  {productCat.length > 0 ? (
                    <>
                      {productCat?.map(itm => {
                        return (
                          <>
                            <ProductCarts
                              key={itm.id}
                              item={itm}
                              productCat={productCat}
                              productImage={productImage}
                              navigation={props.navigation}
                            />
                          </>
                        );
                      })}

                      {/* <View>
                        {productCat?.filter(d => {
                          if (ShopUUId === d.shop_uuid) {
                            console.log('props?.productCat_ddd', d);
                            return (
                              <>
                                <View>
                                  <Text>{d.name}</Text>
                                </View>
                              </>
                            );
                          }
                        })}
                      </View> */}
                    </>
                  ) : (
                    <>
                      <View style={{height: 40}}>
                        <Text>No Product Available</Text>
                      </View>
                    </>
                  )}
                </View>
              </Pressable>
            </ScrollView>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#03bafc',
    borderRadius: 40,
    padding: 40,
  },
  inActive: {
    backgroundColor: 'grey',
    borderRadius: 40,
    padding: 40,
  },
});

export default ProductList;

// {ShopUUId === item?.shop_uuid?<>
//   <ProductCarts
//     key={itm.id}
//     item={itm}
//     productImage={productImage}
//     navigation={props.navigation}
//   />
//   </>:<>
//   <ProductCarts
//     key={itm.id}
//     item={itm}
//     productImage={productImage}
//     navigation={props.navigation}
//   />
//   </>}
