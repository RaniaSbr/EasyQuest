import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const PdfReport = ({ title, userId, date, report }) => {
    const [blob, setBlob] = useState(null);

    const savePDF = () => {
        const pdfBlob = blob;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = `${title}.pdf`;
        link.click();
    };

    return (
        <Document
            onRender={(pdf) => {
                // Store the generated PDF Blob for later download
                setBlob(pdf);
            }}
        >
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.big_title} className="text-5xl">
                        EASY QUEST
                    </Text>
                    <Text style={styles.title} className="text-2xl">
                        Title: {title}
                    </Text>
                    <Text style={styles.author}>User ID: {userId}</Text>
                    <Text style={styles.author}>Date: {date}</Text>
                    <Text style={styles.text}>{report}</Text>
                </View>
            </Page>
        </Document>
    );
};

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
        margin: 15,
        textAlign: "center",
        fontFamily: "Oswald",
    },
    big_title: {
        fontSize: 35,
        margin: 15,
        color:"#0B6623",
        textAlign: "center",
        fontFamily: "Oswald",
    },
    text: {
        fontSize: 12,
        margin: 15,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
    },
    logo: {
        alignItems: 'center',
        width: 80,
        height: 40,
        marginBottom: 10,
    },
});

export default PdfReport;
