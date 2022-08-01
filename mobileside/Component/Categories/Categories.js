import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  //   Text,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useEffect} from 'react';
import {Badge, Text, List} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function Categories(props) {
  const {
    category,
    categories,
    setCategories,
    categoryFilter,
    productCat,
    active,
    setActive,
  } = props;
  useEffect(() => {
    categoryFilter('all'), setActive(-1);
    return () => {
      categoryFilter('all'), setActive(-1);
    };
  }, []);

  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      style={{
        backgroundColor: '#f2f2f2',
        height: 50,
        padding: 5,
      }}>
      <TouchableOpacity
        key={1}
        onPress={() => {
          categoryFilter('all'), setActive(-1);
        }}>
        <Badge
          style={
            (styles.center, [active == -1 ? styles.active : styles.inactive])
          }>
          <Text style={{color: 'grey'}}>All</Text>
        </Badge>
      </TouchableOpacity>
      {categories.map(itm => {
        return (
          <>
            <TouchableOpacity
              key={itm.id}
              onPress={() => {
                console.log('itm.CategoryId', {itm}, itm.id);
                categoryFilter(itm.id), setActive(categories.indexOf(itm));
              }}>
              <Badge
                style={
                  (styles.center,
                  [
                    active == categories.indexOf(itm)
                      ? styles.active
                      : styles.inactive,
                  ])
                }>
                <Text
                  style={
                    (styles.center,
                    [
                      active == categories.indexOf(itm)
                        ? styles.active
                        : styles.inactive,
                    ])
                  }>
                  {itm.name}
                </Text>
              </Badge>
            </TouchableOpacity>
          </>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#03bafc',
    borderRadius: 40,
    color: 'white',
  },
  inActive: {
    backgroundColor: '#03bafc',
    color: 'grey',
    borderRadius: 40,
  },
});
