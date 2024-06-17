import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getEntryByID, getEntriesByIDs } from "../../api/api";
import PagerView from "react-native-pager-view";
import { TranslationContext } from "../../contexts/TranslationContext";
import Markdown from "react-native-markdown-display";
import { Image } from "expo-image";
import { blurhash } from "../../frontend/blurhash";

export const StepScreen = ({ navigation, route }) => {
  const { i18n } = useContext(TranslationContext);
  const [id, setID] = useState(null);
  const [data, setData] = useState();
  const [steps, setSteps] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!route?.params?.id && !id) {
      navigation.navigate("HomeScreen");
    }
    if (route.params.id === null) return;
    setID(route.params.id);
  }, []);

  useEffect(() => {
    if (id === null) return;
    (async () => {
      // fetch selected Context.
      const res = await getEntryByID(id, i18n.locale);
      setData(res);

      // Collect all counselIDs to be able to fetch them.
      const stepIDs = res.fields.steps.map((step) => step.sys.id);
      const stepsRes = await getEntriesByIDs(
        stepIDs,
        i18n.locale,
        "sys.createdAt"
      );

      // Sort Counsels as they are ordered in the Context.
      const sortedSteps = stepIDs.map((id) =>
        stepsRes.items.find((item) => item.sys.id === id)
      );
      stepsRes.items = sortedSteps;
      setSteps(stepsRes);
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      {!data ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator animating color={"#0C2074"} size={"large"} />
        </View>
      ) : (
        <>
          <PagerView
            initialPage={0}
            style={styles.pagerView}
            pageMargin={20}
            layoutDirection={"ltr"}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          >
            {steps?.items &&
              steps?.items?.map((step) => {
                const image = steps?.includes?.Asset?.find(
                  (element) => element?.sys?.id === step?.fields?.image?.sys?.id
                );
                return (
                  <View key={step.sys.id} style={styles.stepContainer}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={`https:${image.fields.file.url}`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={300}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </View>
                    <Markdown
                      textBreakStrategy={"simple"}
                      style={styles.markdown}
                    >
                      {step.fields.excerpt}
                    </Markdown>
                  </View>
                );
              })}
          </PagerView>
          <View style={styles.breadcrumbsContainer}>
            {steps?.items?.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.breadcrumbDot,
                  index === currentPage && styles.activeBreadcrumbDot,
                ]}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C207430",
  },
  pagerView: {
    height: "85%",
    width: "100%",
  },
  stepContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#0C2074",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginHorizontal: "5%",
  },
  imgContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  markdown: {
    body: {
      paddingnHorizontal: 20,
      paddingVertical: 10,
      width: "50%",
    },
    text: {
      fontSize: 20,
    },
  },
  breadcrumbsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  breadcrumbDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5,
  },
  activeBreadcrumbDot: {
    backgroundColor: "#0C2074",
  },
});
