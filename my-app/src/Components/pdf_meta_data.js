<<<<<<< HEAD
import { React, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Line } from "@react-pdf/renderer";
import { Font } from '@react-pdf/renderer';

const PdfMetaData = ({ meta_data }) => {
    const {title, keywords, references, abstract, authors, institutions, url} = meta_data;
=======
import React from "react";
import { Document, Page, Text, View, StyleSheet, Line } from "@react-pdf/renderer";
import { Font } from '@react-pdf/renderer';

const PdfMetaData = ({ title, keywords, references, abstract, authors, institutions, url }) => {
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
    return (
        <Document >
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title} className="text-2xl">{title}</Text>
                    <Text style={styles.author}>{authors.join(", ")}</Text>
                    <Text style={styles.author}>{institutions.join(", ")}</Text>
                    <Line style={{ marginTop: 20, marginBottom: 5, color: "#000" }} />
                    <Text style={{ ...styles.text, textAlign: 'center' }}>
                        <Text style={styles.subtitle}>keywords</Text>
<<<<<<< HEAD
                        {'\n'} {keywords}</Text>
=======
                        {'\n'} {keywords.join(', ')}</Text>
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
                    <Text style={styles.text}>
                        <Text style={styles.subtitle}>Abstract</Text>
                        {'\n'} {abstract}</Text>
                    <Text style={styles.text}><Text style={styles.subtitle}>References</Text>
                        {'\n'} {references.join("\n ")}</Text>
                    <Text style={styles.text}>URL: {url}</Text>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} fixed />
                </View>
            </Page>
        </Document>
    );
};
Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});


const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    section: {
        margin: 10,
        padding: 10,
        marginTop: 40,

        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    text: {
        fontSize: 12,
        margin: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    subtitle: {
        fontSize: 14,
        margin: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Times-Roman'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
});

export default PdfMetaData;
