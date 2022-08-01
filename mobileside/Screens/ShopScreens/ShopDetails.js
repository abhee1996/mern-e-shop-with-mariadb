import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getShopDetailByUuid} from '../../Redux/actions/ShopAuth.action';
import {getfilterShopProduct} from '../../Redux/actions/Product.actions';
import config from '../../config/config';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
const configDotServer = config.server;
const {width, height} = Dimensions.get('window');

const ShopDetails = props => {
  const [shopDeltaProducts, setShopDeltaProducts] = useState();
  console.log('props.route.params', props.route.params.shopListDetails);
  const ShopDeltas = props.route.params.shopListDetails;
  var filterShopProductURL = `${configDotServer}/product/getallProductBy/shopuuid/${ShopDeltas[0]?.shopUuid}`;
  console.log('ShopDeltas[0]?.shopuuid', ShopDeltas[0]?.shopUuid);
  console.log('filterShopProductURL', filterShopProductURL);
  useEffect(() => {
    // getShopDetailByUuid(uuid);
    shopDeltafunc();
  }, []);
  async function shopDeltafunc() {
    const shopDeltaResponse = await getfilterShopProduct(filterShopProductURL);
    setShopDeltaProducts(shopDeltaResponse.data);
  }
  console.log('shopDeltaProducts____', shopDeltaProducts);
  return (
    <View>
      {props.route.params.shopListDetails ? (
        <>
          {props.route.params.shopListDetails?.map(shop => {
            console.log('shop', shop);
            return (
              <>
                <View>
                  <Text>{shop.name}</Text>
                </View>
                <View>
                  <Text>{shop.owner}</Text>
                </View>
                <View>
                  <Text>{shop.number}</Text>
                </View>
                <View>
                  <Text>{shop.place}</Text>
                </View>
                <View>
                  <Text>Shop Products</Text>
                  <>
                    <>
                      {/* // case 1: Shop is logged In */}
                      {shopDeltaProducts ? (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flexBasis: '50%',
                            }}>
                            {shopDeltaProducts.map(shp => {
                              return (
                                <>
                                  <TouchableOpacity style={styles.container}>
                                    <Image
                                      resizeMode="contain"
                                      style={styles.image}
                                      source={{
                                        uri: shp?.image,
                                      }}
                                    />

                                    <View style={styles.card} />
                                    <Text style={styles.title}>
                                      {shp?.name?.length > 15
                                        ? shp?.name?.substring(0, 15 - 3) +
                                          '...'
                                        : shp?.name}
                                    </Text>
                                    <Text style={styles.cartPrice}>
                                      ${shp?.price}
                                    </Text>
                                  </TouchableOpacity>
                                </>
                              );
                            })}
                          </View>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  </>
                </View>
              </>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    height: width / 1.9,
    padding: 10,
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width,
    height: 90,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2.5 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  cartPrice: {
    fontSize: 20,
    color: 'orange',
    marginTop: 0,
  },
});
