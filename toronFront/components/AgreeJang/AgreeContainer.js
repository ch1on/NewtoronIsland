import React from "react";
import { FlatList, StyleSheet, Text, View, StatusBar, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';

const renderText = ({ item }) => {
  <View style={styles.textBox}>
      <Text style={styles.text}>{item.board_content}</Text>
    </View>
    
};


const AgreeContainer =()=>{
  const styles = StyleSheet.create({
        container: {
            // flex: 1,
            paddingLeft: 25,
            paddingRight: 25,
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
          },
        
          hapBox: {
            backgroundColor: '#EFEFEF',
            width: 90,
            padding: 3,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 12,
            marginTop: 5,
          },
          hap:{
            fontSize: 10
          },
          goRight: {
            alignItems: 'flex-end'
          },
          textBox:{
            marginTop: 10,
            marginBottom: 3,
            padding: 20,
            height: "100%",
            // backgroundColor: 'pink',
            // flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          },
          text:{
            fontSize: 16,
            color: 'black',
            fontWeight: '700',
            // marginLeft: '20%'
          },
          vs:{
            
          },
          contentBox:{
            backgroundColor: 'white',
            // flex: 5,
            flexShrink: 1,
            flexBasis: '0%',
            flexGrow: 1,
            padding: 15,
            borderRadius: 15,
            
            // css에서 하던 shadow와 비슷하지만 사용 방법이 다름 
            // ios는 아래 방법 대로, android는 두 번째 방법 대로 설정해 줘야 함
            ...Platform.select({
              ios:{
                shadowColor: '#B3B3B3',
                shadowOffset: {width: 2, height: 2, },
                shadowOpacity: 0.2,
                shadowRadius: 10,
              },
              android:{
                elevation: 20,
              }
            })
        
          },
          AgreeButton:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 10,
            height: 50
          },
          deadLineBox:{
            alignItems: 'center',
            justifyContent: 'center',
          },
          goodImage:{
            width: 30,
            height: 30
          },
          badImage:{
            width: 30,
            height: 30
          },
          AgreeBox:{
            alignItems: 'center',
            justifyContent: 'center',
          },
          disAgreeBox:{
            marginLeft: 30,
            alignItems: 'center',
            justifyContent: 'center',
          },
          Agree:{
            fontSize: 10,
            margin: 3,
            fontWeight: '600'
          },
          disAgree:{
            fontSize: 10,
            margin: 3,
            fontWeight: '600'
          },
          deadLineText:{
            color: '#B3B3B3',
            fontSize: 10,
            marginBottom: 30
          }
    });

    // 필요한 함수 
    // 1. 어제와 비교했을 때 1일 지났는지 
    // 2. True -> text 필드 값 변경 (데이터 가져와야 함)
    // 3. 변경 되었는지 확인 
    // 4. 변경 True -> DB insert (모델의데이터를업데이트 : 컨트롤러에서)
    
    // 1. 7일이 지나면 (View)
    // 2. state 값 변경 (모델의데이터를업데이트 : 컨트롤러)
    // 3. 값 변경 True -> View (댓글창 false로) 
     
    
    

    // 1. 1일이 지났는지 확인하기 위한 함수 
    function days_between(date1, date2) {
       // 하루의 밀리초 수
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // 밀리초로 차이 계산
        const differenceMs = Math.abs(date1 - date2);

        // 다시 일수로 변환하여 반환
        return Math.round(differenceMs / ONE_DAY);
      }
    // 2. 계산에 사용될 날짜 
        const dt = new Date();
        dt.setHours(0, 0 ,0, 0); // 시간은 필요 없으니 제거 
        const formatDate = (date) => date.toISOString().split('T')[0]; // 날짜를 문자열로 지정해 주는 함수 formatDate 
        // 날짜 출력 형태: 2024-01-02
        const today = formatDate(dt); // 오늘 날짜 
        // console.log(today); // 확인하고 싶으면 주석 풀어서 보셔요 
        const yesterday = formatDate(new Date(dt.setDate(dt.getDate() - 1)));

        const date1 = new Date(yesterday);
        const date2 = new Date(today);
        // console.log(date1);
        const daysDifference = days_between(date1, date2);
        const result = daysDifference.toString();
      
    // function oneDay(){
    //   if(result == '1'){
    //     // text 내용 바꿈 
    //     // db에서 가져올 때 vs를 중심으로 문자열 나누면 되는 걸가
    //     setInterval(days_between, 300000)
      
    //   }
    // }

    

    const[posts, setPosts] = useState([]);

    useEffect(()=>{
      const fetchPosts = async ()=>{
        try{
          const response = await fetch('http://192.168.219.159:8081/board_data');
          const data = await response.json();
          setPosts(data);

          console.log(data);
        }catch(error){
          console.log('게시물 가져오기 에러', error.message);
          // console.log('씌팔');
        }
      };
      fetchPosts();
      // const intervalId = setInterval(()=>{
      //   fetchPosts();
      // }, 7 * 24 * 60 * 60 * 1000);
      
    return () => {
      // clearInterval(intervalId);
    };
    }, []);
    



  

    return(
        <View style={[styles.container,{flexDirection: 'row',}]}>
      

          <View style={styles.contentBox}>
            <View style={styles.goRight}>
              <View style={styles.hapBox}>
                <Text style={styles.hap}>현재 n명 참여</Text>
              </View>
            </View>
        
            {/* <ScrollView style={styles.textBox}> */}
            {/* // 서버로 전송 받은 채팅 데이터 화면에 출력 */}
            <FlatList
            data={posts}
             renderItem={renderText}
             keyExtractor={(item) => item.board_id.toString()}
            >
            </FlatList>
            
            {/* </ScrollView> */}

            <View style={styles.AgreeButton}>
              <TouchableOpacity style={styles.AgreeBox} >
                <Image style={styles.goodImage} source={require('../../assets/good.png')}></Image>
                  <Text style={styles.Agree}>뭐라</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.disAgreeBox} >
                <Image style={styles.badImage} source={require('../../assets/bad.png')}></Image>
                  <Text style={styles.disAgree}>하지</Text>
              </TouchableOpacity>
            </View>

              <View style={styles.deadLineBox}>
                <Text style={styles.deadLineText}>n일 뒤에 종료됩니다.</Text>
              </View>
              </View>
            <StatusBar style="auto" />
      </View>
    )
}

export default AgreeContainer;