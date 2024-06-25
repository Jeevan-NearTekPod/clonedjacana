import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const getProducts = () => {
  return fetch('http://192.168.1.56:3001/api/products')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
    });
};

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      console.log(products, 'hello');
      setData(products);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Receipt</Text>
      {Array.isArray(data) &&
        data.map((item, index) => {
          let responseDataParse;
          try {
            responseDataParse = JSON.parse(item?.responseData)?.extractedData
              ?.data;
          } catch (error) {
            console.error(error);
          }
          return (
            <View key={index} style={styles.card}>
              <CardRow label="Email ID:" value={item?.email} />
              <CardRow
                label="Invoice Date:"
                value={responseDataParse?.invoice_date || 'N/A'}
              />
              <CardRow
                label="Supplier Name:"
                value={responseDataParse?.supplier_name || 'N/A'}
              />
              <CardRow
                label="Total Tax Amount:"
                value={responseDataParse?.total_tax_amount || 'N/A'}
              />
              <CardRow
                label="Net Amount:"
                value={responseDataParse?.net_amount || 'N/A'}
              />
              <CardRow
                label="Total Amount:"
                value={responseDataParse?.total_amount || 'N/A'}
              />
              <CardRow
                label="Receiver Name:"
                value={responseDataParse?.receiver_name || 'N/A'}
              />
              <CardRow
                label="Invoice Type:"
                value={responseDataParse?.invoice_type || 'N/A'}
              />
              <CardRow
                label="Remit To Name:"
                value={responseDataParse?.remit_to_name || 'N/A'}
              />
              <CardRow
                label="Supplier Website:"
                value={responseDataParse?.supplier_website || 'N/A'}
              />
              <CardRow
                label="Supplier Address:"
                value={responseDataParse?.supplier_address || 'N/A'}
              />
              <CardRow
                label="Line Item:"
                value={responseDataParse?.line_item || 'N/A'}
              />
              {responseDataParse?.extractedText ? (
                <View style={styles.extractedTextContainer}>
                  <Text>{responseDataParse.extractedText}</Text>
                </View>
              ) : null}
            </View>
          );
        })}
    </ScrollView>
  );
};

function CardRow({label, value}) {
  return (
    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cardLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: 'black',
  },
  cardValue: {
    flex: 2,
    color: 'black',
  },
  extractedTextContainer: {
    marginTop: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
