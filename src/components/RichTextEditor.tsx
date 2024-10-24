import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, Button } from 'react-native'
import React from 'react'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { theme } from '../constants/theme';

interface Props {
  editorRef: any,
  onChangeText: (text: string) => void;
}

export default function RichTextEditor(props: Props) {

  const { editorRef, onChangeText } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{minHeight: 285}}>
        <RichToolbar
          actions={[
            actions.setStrikethrough,
            actions.removeFormat,
            actions.setBold,
            actions.setItalic,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,
            actions.heading1,
            actions.heading4,
          ]}
          iconMap={{
            [actions.heading1] : ({tintColor}) => <Text style={{color: tintColor}}>H1</Text> ,
            [actions.heading4] : ({tintColor}) => <Text style={{color: tintColor}}>H4</Text> 
          }}
          style={styles.richBar}
          flatContainerStyle={styles.flatStyle}
          selectedIconTint={theme.colors.primaryDark}
          editor={editorRef}
          disabled={false}
        />

        <RichEditor
          ref={editorRef}
          containerStyle={styles.rich}
          editorStyle={styles.contentStyle}
          placeholder={"What's on your mind?"}
          onChange={onChangeText}
          onKeyUp={key => {
            if (key.key === 'Enter') {
              editorRef.current.blurContentEditor(); // This will hide dismiss the keyboard
            }
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  richBar:{
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray
  },
  rich: {
    minHeight: 240,
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
    padding: 5
  },
  contentStyle: {
    color: theme.colors.textDark,
    placeholderColor: 'gray'
  },
  flatStyle:{
    paddingHorizontal: 8,
    gap: 3,
  },
})
