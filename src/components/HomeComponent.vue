<template>
  <div class="home">
    <div class="containerr">
      <div class="navbar">
        <div class="logo">
          <router-link to="/home">MEMO</router-link>
        </div>
        <div class="darkMod">
          <input type="checkbox" name="switch" id="switch" />
          <label for="switch" id="labForSwitch"></label>
        </div>
        <!-- /logo -->
      </div>
      <!-- /navbar -->
      <div class="sidebar">

        <div class="coverSearcher">
          <div class="navSearcher">
            <div class="closeSearcher" @click="closeSearcherMsg(false)">
              <div class="closeSpan">
                <span></span>
                <span></span>
              </div>
              <!-- /closeSpan -->
            </div>
            <!-- /closeSearcher -->
            <div class="textSearcher">
              {{ _trans("textSearcher") }}
            </div>
            <!-- /textSearcher -->
          </div>
          <!-- /navSearcher -->

          <div class="searcherInputCover">
            <div class="searcherInput">
              <div class="deleteArrow">
                <fa class="arrow-down" icon="arrow-down"></fa>
                <fa class="searchInputMsg" icon="search"></fa>
              </div>
              <input type="text" name="" v-model="inputValueForSearchMsg" @focus="addaAnimationForArrow(true)"
                @blur="addaAnimationForArrow(false)" class="searchInput" id="inputValueForSearchMsg">
            </div>
            <!-- /searcherInput -->
          </div>
          <!-- /searcherInputCover -->

          <div class="cardWepperSearcher">



          </div>
          <!-- /cardSearcher -->
        </div>
        <!-- /coverSearcher -->

        <div class="leftSideBar">
          <ArchiveChatComponent @contactsOptionsM="contactsOptionsM" @reciverUseer="reciverUseer"
            @showArchiveContact="showArchiveContact" :checkArchive="checkArchive"></ArchiveChatComponent>

          <BlockListComponent @unblockUser="unblockUser" @showBlockList="showBlockList" :blockList="blockList">
          </BlockListComponent>

          <div class="mynav">
            <div class="imgProfile">
              <router-link to="">
                <img @click="showProfile()" src="../assets/uploads/image/default.png" id="myImg" alt="" />
              </router-link>
            </div>
            <div class="listOptionProfile">
              <ul>
                <li>
                  <div class="storyIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48.138" height="48.138" viewBox="0 0 48.138 48.138">
                      <g id="Ellipse_146" data-name="Ellipse 146"
                        transform="matrix(0.438, 0.899, -0.899, 0.438, 32.357, 0)" fill="none" stroke="#a9a9a9"
                        stroke-linecap="round" stroke-width="5" stroke-dasharray="20 15">
                        <circle cx="18" cy="18" r="18" stroke="none" />
                        <circle cx="18" cy="18" r="15.5" fill="none" />
                      </g>
                    </svg>
                  </div>
                  <!-- /storyIcon -->
                </li>
                <li>
                  <bouttn class="chatIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32.837" viewBox="0 0 33 32.837">
                      <g id="Group_141" data-name="Group 141" transform="translate(-624.323 -28.977)">
                        <g id="Group_140" data-name="Group 140" transform="translate(624 29.38)">
                          <rect id="Rectangle_279" data-name="Rectangle 279" width="33" height="29" rx="6"
                            transform="translate(0.323 -0.403)" fill="#a9a9a9" />

                        </g>
                        <rect id="Rectangle_280" data-name="Rectangle 280" width="21" height="4" rx="2"
                          transform="translate(629.323 36.977)" fill="#000" />
                        <rect id="Rectangle_281" data-name="Rectangle 281" width="16" height="4" rx="2"
                          transform="translate(629.323 44.977)" fill="#000" />
                      </g>
                    </svg>
                  </bouttn>
                  <!-- /chatIcon -->
                </li>
                <li @click.prevent="seetingProfile()">
                  <button id="settingButton">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </li>
              </ul>
            </div>
            <!--/listOptionProfile -->
          </div>
          <!-- /mynav -->
          <div class="serachBar">
            <div class="icon">
              <fa icon="search" />
            </div>
            <input type="text" v-model="serachUser" :placeholder="_trans('search') + ' ...'" />
          </div>
          <!-- /serachBar -->
          <div class="wepperContactList">
            <div class="contactList">
              <div class="wepper-card" v-if="reciveMyChat.length > 0">
                <div class="carad" v-for="(item, index) in reciveMyChat" :key="index" :id="item.id">
                  <!-- this run when get old chat -->
                  <router-link v-if="!item.chatRoom && item.reciver_id" @click.prevent="
                    getMessageByUser(
                      sndRcvId[index].rcv_id,
                      sndRcvId[index].snd_id,
                      item.id,
                      item
                    )
                  " to="">
                    <div class="imgContactProfile">
                      <div v-if="item.image">
                        <img :src="item.image" alt="" />
                      </div>
                      <div v-else>
                        <img src="../assets/uploads/image/default.png" alt="" />
                      </div>
                    </div>
                    <div class="user-lastMsg">
                      <div class="user" v-if="item.username">
                        {{ item.username }}
                      </div>
                      <div class="user" v-else-if="item.first_name">
                        {{ item.first_name + " " + item.last_name }}
                      </div>
                      <div :type="item.message_type" v-if="item.state == 2 && user.id != item.msg_sender"
                        style="font-weight: 900" class="lastMessage">
                        <span v-if="item.message_type == 'text'">
                          {{ item.last_message }}
                        </span>
                        <span v-if="item.message_type == 'video'">{{ _trans("vedio") }}&nbsp; <fa icon="film"></fa>
                        </span>
                        <span v-if="item.message_type == 'voice'">{{ _trans("voice") }} &nbsp;&nbsp;&nbsp;<fa
                            icon="microphone"></fa></span>
                        <span v-if="item.message_type == 'location'">{{ _trans("location") }}&nbsp;&nbsp;<fa icon="map">
                          </fa></span>
                        <span v-if="item.message_type == 'imageWeb'">{{ _trans("image") }}&nbsp;&nbsp;&nbsp;<fa
                            icon="image"></fa></span>
                        <span v-if="item.message_type == 'file'">{{ _trans("file") }}&nbsp;&nbsp;&nbsp;<fa icon="file">
                          </fa></span>
                      </div>
                      <div v-else-if="
                        item.mstate == 2 &&
                        item.state == null &&
                        user.id != item.msg_sender
                      " :type="item.message_type" style="font-weight: 900" class="lastMessage">
                        <span v-if="item.message_type == 'text'">{{ item.last_message }}
                        </span>
                        <span v-if="item.message_type == 'video'">{{ _trans("vedio") }}&nbsp; <fa icon="film"></fa>
                        </span>
                        <span v-if="item.message_type == 'voice'">{{ _trans("voice") }} &nbsp;&nbsp;&nbsp;<fa
                            icon="microphone"></fa></span>
                        <span v-if="item.message_type == 'location'">{{ _trans("location") }}&nbsp;&nbsp;<fa icon="map">
                          </fa></span>
                        <span v-if="item.message_type == 'imageWeb'">{{ _trans("image") }}&nbsp;&nbsp;&nbsp;<fa
                            icon="image"></fa></span>
                        <span v-if="item.message_type == 'file'">{{ _trans("file") }}&nbsp;&nbsp;&nbsp;<fa icon="file">
                          </fa></span>
                      </div>

                      <div :type="item.message_type" v-else class="lastMessage">
                        <span v-if="item.message_type == 'text'">
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 2
                          " src="../assets/uploads/image/check-image-not-seen.png" alt="" />
                          <img class="imageState" v-else-if="
                            item.msg_sender == user.id && item.mstate == 3
                          " src="../assets/uploads/image/check-dubole.png" alt="" />
                          <img class="imageState" v-else-if="
                            item.msg_sender == user.id && item.mstate == 1
                          " src="../assets/uploads/image/check-image-icon-24.jpg" alt="" />
                          {{ item.last_message }}
                        </span>
                        <span v-if="item.message_type == 'video'"><img class="imageState" v-if="
                          item.msg_sender == user.id && item.mstate == 2
                        " src="../assets/uploads/image/check-image-not-seen.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 3
                          " src="../assets/uploads/image/check-dubole.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 1
                          " src="../assets/uploads/image/check-image-icon-24.jpg" alt="" />
                          {{ _trans("vedio") }}&nbsp; <fa icon="film"></fa></span>
                        <span v-if="item.message_type == 'voice'">
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 2
                          " src="../assets/uploads/image/check-image-not-seen.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 3
                          " src="../assets/uploads/image/check-dubole.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 1
                          " src="../assets/uploads/image/check-image-icon-24.jpg" alt="" />
                          {{ _trans("voice") }} &nbsp;&nbsp;&nbsp;<fa icon="microphone"></fa></span>
                        <span v-if="item.message_type == 'location'">
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 2
                          " src="../assets/uploads/image/check-image-not-seen.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 3
                          " src="../assets/uploads/image/check-dubole.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 1
                          " src="../assets/uploads/image/check-image-icon-24.jpg" alt="" />
                          {{ _trans("location") }}&nbsp;&nbsp;<fa icon="map"></fa></span>
                        <span v-if="item.message_type == 'imageWeb'">
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 2
                          " src="../assets/uploads/image/check-image-not-seen.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 3
                          " src="../assets/uploads/image/check-dubole.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 1
                          " src="../assets/uploads/image/check-image-icon-24.jpg" alt="" />
                          {{ _trans("image") }}&nbsp;&nbsp;&nbsp;<fa icon="image"></fa></span>
                        <span v-if="item.message_type == 'file'">
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 2
                          " src="../assets/uploads/image/check-image-not-seen.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 3
                          " src="../assets/uploads/image/check-dubole.png" alt="" />
                          <img class="imageState" v-if="
                            item.msg_sender == user.id && item.mstate == 1
                          " src="../assets/uploads/image/check-image-icon-24.jpg" alt="" />
                          {{ _trans("file") }}&nbsp;&nbsp;&nbsp;<fa icon="file"></fa></span>
                      </div>
                    </div>
                    <!-- /user-lastMsg -->
                  </router-link>

                  <!-- this run when i do search and i have chat room for this user -->
                  <router-link v-else-if="item.chatRoom != null && !item.reciver_id" @click.prevent="
                    getMessageByUser(
                      item.chatRoom[0].reciver_id,
                      item.chatRoom[0].sender_id,
                      item.chatRoom[0].id,
                      item
                    )
                  " to="">
                    <div class="imgContactProfile">
                      <div v-if="item.image">
                        <img :src="item.image" alt="" />
                      </div>
                      <div v-else>
                        <img src="../assets/uploads/image/default.png" alt="" />
                      </div>
                    </div>
                    <div class="user-lastMsg">
                      <div class="user" v-if="item.username">
                        {{ item.username }}
                      </div>
                      <div class="user" v-else-if="item.first_name">
                        {{ item.first_name + " " + item.last_name }}
                      </div>
                      <div class="lastMessage" v-if="item.chatRoom[0].last_message">
                        <span v-if="item.message_type == 'text'">{{ item.chatRoom[0].last_message }}
                        </span>
                        <span v-if="item.message_type == 'video'">{{ _trans("vedio") }}&nbsp; <fa icon="film"></fa>
                        </span>
                        <span v-if="item.message_type == 'voice'">{{ _trans("voice") }} &nbsp;&nbsp;&nbsp;<fa
                            icon="microphone"></fa></span>
                        <span v-if="item.message_type == 'location'">{{ _trans("location") }}&nbsp;&nbsp;<fa icon="map">
                          </fa></span>
                        <span v-if="item.message_type == 'imageWeb'">{{ _trans("image") }}&nbsp;&nbsp;&nbsp;<fa
                            icon="image"></fa></span>
                        <span v-if="item.message_type == 'file'">{{ _trans("file") }}&nbsp;&nbsp;&nbsp;<fa icon="file">
                          </fa></span>
                      </div>
                      <div class="lastMessage" v-else>
                        <span v-if="item.message_type == 'text'">{{ item.last_message }}
                        </span>
                        <span v-if="item.message_type == 'video'">{{ _trans("vedio") }}&nbsp; <fa icon="film"></fa>
                        </span>
                        <span v-if="item.message_type == 'voice'">{{ _trans("voice") }} &nbsp;&nbsp;&nbsp;<fa
                            icon="microphone"></fa></span>
                        <span v-if="item.message_type == 'location'">{{ _trans("location") }}&nbsp;&nbsp;<fa icon="map">
                          </fa></span>
                        <span v-if="item.message_type == 'imageWeb'">{{ _trans("image") }}&nbsp;&nbsp;&nbsp;<fa
                            icon="image"></fa></span>
                        <span v-if="item.message_type == 'file'">{{ _trans("file") }}&nbsp;&nbsp;&nbsp;<fa icon="file">
                          </fa></span>
                      </div>
                    </div>
                    <!-- /user-lastMsg -->
                  </router-link>

                  <!-- this run when i dont have chat room for this user -->
                  <router-link v-else @click.prevent="
                    getMessageByUser(item.id, user.id, null, item)
                  " to="">
                    <div class="imgContactProfile">
                      <div v-if="item.image">
                        <img :src="item.image" alt="" />
                      </div>
                      <div v-else>
                        <img src="../assets/uploads/image/default.png" alt="" />
                      </div>
                    </div>
                    <div class="user-lastMsg">
                      <div class="user" v-if="item.username">
                        {{ item.username }}
                      </div>
                      <div class="user" v-else-if="item.first_name">
                        {{ item.first_name + " " + item.last_name }}
                      </div>
                      <div class="lastMessage" v-if="item.chatRoom">
                        <span v-if="item.message_type == 'text'">{{ item.item.chatRoom[0].last_message }}
                        </span>
                        <span v-if="item.message_type == 'video'">{{ _trans("vedio") }}&nbsp; <fa icon="film"></fa>
                        </span>
                        <span v-if="item.message_type == 'voice'">{{ _trans("voice") }} &nbsp;&nbsp;&nbsp;<fa
                            icon="microphone"></fa></span>
                        <span v-if="item.message_type == 'location'">{{ _trans("location") }}&nbsp;&nbsp;<fa icon="map">
                          </fa></span>
                        <span v-if="item.message_type == 'imageWeb'">{{ _trans("image") }}&nbsp;&nbsp;&nbsp;<fa
                            icon="image"></fa></span>
                        <span v-if="item.message_type == 'file'">{{ _trans("file") }}&nbsp;&nbsp;&nbsp;<fa icon="file">
                          </fa></span>
                      </div>
                      <div class="lastMessage" v-else>
                        <span v-if="item.message_type == 'text'">{{ item.last_message }}
                        </span>
                        <span v-if="item.message_type == 'video'">{{ _trans("vedio") }}&nbsp; <fa icon="film"></fa>
                        </span>
                        <span v-if="item.message_type == 'voice'">{{ _trans("voice") }} &nbsp;&nbsp;&nbsp;<fa
                            icon="microphone"></fa></span>
                        <span v-if="item.message_type == 'location'">{{ _trans("location") }}&nbsp;&nbsp;<fa icon="map">
                          </fa></span>
                        <span v-if="item.message_type == 'imageWeb'">{{ _trans("image") }}&nbsp;&nbsp;&nbsp;<fa
                            icon="image"></fa></span>
                        <span v-if="item.message_type == 'file'">{{ _trans("file") }}&nbsp;&nbsp;&nbsp;<fa icon="file">
                          </fa></span>
                      </div>
                    </div>
                    <!-- /user-lastMsg -->
                  </router-link>

                  <div class="dateAndOptions">
                    <span v-if="item.created_at && item.created_at != 'Invalid date'">{{ item.created_at }}</span>
                    <div class="aroow">
                      <button class="focusBtn" data-check="0" @click="contactsOptionsM(index, item)"
                        data-rotate-arow="180">
                        <fa icon="chevron-down" style="font-size: 13px" />
                      </button>
                    </div>
                    <!-- /aroow -->

                    <div class="notSeenState" v-if="item.num_msg > 0" v-text="convertFormatNumber(item.num_msg)"></div>
                    <!-- /notSeenState -->
                  </div>
                  <!-- /dateAndOptions -->
                </div>
                <!-- /carad -->
              </div>
              <div class="wepper-card notFounChats" v-else-if="reciveMyChat.length <= 0 && !searchLoader">
                {{ _trans("note10") }}
              </div>
              <div class="loaderForGetData" v-if="searchLoader">
                <div class="loader"></div>
              </div>
              <!-- /loaderForGetData -->
              <!-- <div class="wepper-card" v-else>dont have any chat</div> -->
              <!-- /wepper-card -->
            </div>
          </div>
          <!-- /wepperContactList -->

          <div class="myProfile">
            <div class="navProfile">
              <p @click="closeProfile" class="closeProfiles">
                <svg id="exitProfile" xmlns="http://www.w3.org/2000/svg" width="12.532" height="22.354"
                  viewBox="0 0 12.532 22.354">
                  <g id="Group_197" data-name="Group 197" transform="translate(22.355 11.177) rotate(135)">
                    <rect id="Rectangle_348" data-name="Rectangle 348" width="15.807" height="1.916" rx="0.958"
                      transform="translate(0 13.891)" fill="#fff" />
                    <rect id="Rectangle_349" data-name="Rectangle 349" width="15.807" height="1.916" rx="0.958"
                      transform="translate(15.807 0.001) rotate(90)" fill="#fff" />
                  </g>
                </svg>
              </p>
              <p>{{ _trans("personalAcount") }}</p>
            </div>
            <!-- /navProfile -->

            <div class="wepperProfile">
              <div class="imagePro">
                <label for="newProfileImage">
                  <fa icon="camera-retro"></fa>
                  {{ _trans("changeP") }}
                </label>
                <!-- /serialNumber -->
                <input style="display: none" type="file" id="newProfileImage" />
                <img v-if="user.profile_image" :src="imagProfilePath" id="desplayProfileImage" alt="" />
                <img v-else src="../assets/uploads/image/default.png" id="desplayProfileImage" alt="" />
              </div>
              <!-- imagePro -->
              <div class="profileNmae">
                <div class="name">{{ _trans("name") }}</div>
                <div class="yourName">
                  <div>
                    <div class="inputFirstNameLstName" v-if="displayInput == 'inputTure'">
                      <input type="text" v-model="username" id="inputFirstNameLstName" />
                      <div class="savFLname" v-text="countInputFnameLname"></div>
                      <div class="savFLname" @click="closeInput('input')">
                        <fa icon="check" />
                      </div>
                    </div>
                    <!-- /inputFirstNameLstName -->
                    <div id="displayNewId" v-if="!(displayInput == 'inputTure')">
                      {{ user.first_name + " " + user.last_name }}
                    </div>
                  </div>
                  <!-- /div -->
                  <p class="pen" v-if="!(displayInput == 'inputTure')" id="penInput" @click="showInput('input')">
                    {{ _trans("edit") + '...' }}
                  </p>
                </div>
                <!-- /yourName -->
              </div>
              <!-- /profileNmae -->
              <div class="Memoidentifier">
                <p class="memoEdentifire">{{ _trans("Memoidentifier") + " " }}</p>
                <div class="serialNumber" v-if="user.sn" v-text="' ' + user.sn + ' '"></div><!-- / -->
              </div>
              <!-- /warring -->
              <div class="profileSate">
                <div class="status">{{ _trans("status") }}</div>
                <div class="yourStatus">
                  <div id="yourStatus">
                    <div class="inputStatus" v-if="displayInput == 'statusTrue'">
                      <textarea name="" id="inputStatus" cols="30" rows="10" v-model="status"></textarea>
                      <div class="savStatus" v-if="displayInput == 'statusTrue'" @click="closeInput('status')">
                        <fa icon="check" />
                      </div>
                    </div>
                    <!-- /inputStatus -->
                    <div id="displayNewState" v-if="!(displayInput == 'statusTrue')">
                      {{ user.status }}
                    </div>
                  </div>
                  <!-- /yourStatus -->
                  <p class="pen" v-if="!displayInput" @click="showInput('status')">
                    {{ _trans("edit") + "..." }}
                  </p>
                </div>
                <!-- /yourStatus -->
              </div>
              <!-- /profileSate -->
              <div class="deleteAccount">
                <button v-if="!checkDeleteAcount" @click="deleteAcountActive(true)">
                  {{ _trans("deleteAcount") }}
                </button>
                <button v-if="checkDeleteAcount" @click="deleteAcountActive(false)">
                  {{ _trans("deleteAcount") }}
                </button>
              </div>
              <!-- /deleteAccount -->
            </div>
            <!-- /wepperProfile -->
          </div>
          <!-- /myProfile -->
        </div>
        <!-- /leftSideBar -->

        <div class="rightSidebar">
          <div class="memologo">
            <div class="imgLogo">
              <svg id="mainCycle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="598" height="598" viewBox="0 0 598 598">
                <defs>
                  <linearGradient id="linear-gradient" x1="0.5" y1="0.993" x2="0.5" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#e1e9eb" />
                    <stop offset="1" stop-color="#f0f5f8" />
                  </linearGradient>
                </defs>
                <circle id="Ellipse_142" data-name="Ellipse 142" cx="299" cy="299" r="299"
                  fill="url(#linear-gradient)" />
              </svg>
              <div class="wifiPhone">
                <svg id="wifiIcon" xmlns="http://www.w3.org/2000/svg" width="126.665" height="126.665"
                  viewBox="0 0 126.665 126.665">
                  <g id="Group_139" data-name="Group 139" transform="translate(-1615.168 -266.786)">
                    <path id="Subtraction_2" data-name="Subtraction 2"
                      d="M17.258,89.566H0a90.925,90.925,0,0,1,.462-9.158,89.769,89.769,0,0,1,1.357-8.893c.591-2.886,1.333-5.774,2.207-8.583C4.891,60.153,5.9,57.385,7.038,54.7c1.124-2.656,2.392-5.291,3.772-7.829,1.369-2.519,2.878-5,4.486-7.385s3.334-4.687,5.156-6.9,3.763-4.342,5.781-6.36,4.159-3.964,6.36-5.781,4.527-3.556,6.9-5.156,4.864-3.117,7.385-4.486c2.538-1.379,5.172-2.648,7.829-3.772,2.682-1.134,5.45-2.148,8.229-3.012,2.81-.874,5.7-1.617,8.584-2.207A89.8,89.8,0,0,1,80.408.462,91.005,91.005,0,0,1,89.566,0V17.258A72.39,72.39,0,0,0,17.258,89.566Z"
                      transform="translate(1678.501 266.786) rotate(45)" fill="#fff" />
                    <path id="Subtraction_3" data-name="Subtraction 3"
                      d="M18.135,57.851H0A58.287,58.287,0,0,1,1.175,46.192a57.534,57.534,0,0,1,8.7-20.686A58.017,58.017,0,0,1,35.332,4.546,57.55,57.55,0,0,1,46.191,1.175,58.278,58.278,0,0,1,57.85,0V18.135A39.76,39.76,0,0,0,18.135,57.851Z"
                      transform="translate(1678.501 311.638) rotate(45)" fill="#fff" />
                    <ellipse id="Ellipse_141" data-name="Ellipse 141" cx="12.184" cy="12.184" rx="12.184" ry="12.184"
                      transform="translate(1666.317 368.82)" fill="#fff" />
                  </g>
                </svg>

                <div class="memoPhoneIcon">

                  <svg id="memIcon" xmlns="http://www.w3.org/2000/svg" width="73.978" height="55.285"
                    viewBox="0 0 73.978 55.285">
                    <g id="Group_159" data-name="Group 159" transform="translate(0.001 0)">
                      <rect id="Rectangle_269" data-name="Rectangle 269" width="59.468" height="15.858" rx="7.929"
                        transform="translate(-0.001 44.882) rotate(-49)" fill="#e6edef" />
                      <rect id="Rectangle_270" data-name="Rectangle 270" width="59.468" height="15.858" rx="7.929"
                        transform="translate(22.993 44.882) rotate(-49)" fill="#e6edef" />
                      <rect id="Rectangle_271" data-name="Rectangle 271" width="49.161" height="15.858" rx="7.929"
                        transform="translate(54.944 52.47) rotate(-90)" fill="#e6edef" />
                    </g>
                  </svg>

                  <svg id="phoneObject" xmlns="http://www.w3.org/2000/svg" width="148" height="296"
                    viewBox="0 0 148 296">
                    <g id="Group_68" data-name="Group 68" transform="translate(-273.146 -194.807)">
                      <rect id="Rectangle_216" data-name="Rectangle 216" width="148" height="296" rx="34"
                        transform="translate(273.146 194.807)" fill="#b7b7b7" />
                      <rect id="Rectangle_217" data-name="Rectangle 217" width="130" height="276" rx="25"
                        transform="translate(282.146 204.807)" fill="#f6f6f6" />
                      <rect id="Rectangle_218" data-name="Rectangle 218" width="58" height="13" rx="6.5"
                        transform="translate(318.146 200.807)" fill="#b7b7b7" />
                      <rect id="Rectangle_219" data-name="Rectangle 219" width="10" height="10"
                        transform="translate(311.146 197.807)" fill="#b7b7b7" />
                      <ellipse id="Ellipse_110" data-name="Ellipse 110" cx="3.5" cy="3" rx="3.5" ry="3"
                        transform="translate(311.146 204.807)" fill="#f6f6f6" />
                      <rect id="Rectangle_220" data-name="Rectangle 220" width="9.5" height="6"
                        transform="translate(305.146 204.807)" fill="#f6f6f6" />
                      <rect id="Rectangle_221" data-name="Rectangle 221" width="10" height="10"
                        transform="translate(373.146 197.807)" fill="#b7b7b7" />
                      <ellipse id="Ellipse_111" data-name="Ellipse 111" cx="3.5" cy="3" rx="3.5" ry="3"
                        transform="translate(376.146 204.807)" fill="#f6f6f6" />
                      <rect id="Rectangle_222" data-name="Rectangle 222" width="10" height="6"
                        transform="translate(379.146 204.807)" fill="#f6f6f6" />
                    </g>
                  </svg>
                </div>
                <!-- /memoPhoneIcon -->

              </div>
              <!-- /wifiPhone -->
            </div>
            <!-- /imgLogo -->
            <div class="headerp">
              <p> {{ _trans("headerp") }}</p>
              <p>{{ _trans("pargragph") }}</p>
            </div>
            <!-- /headerp -->

            <div class="line">
            </div>
            <!-- /line -->

            <div class="footerP">
              {{ _trans("footerP") }}
            </div>
            <!-- /footerP -->

            <div class="greenLine"></div><!-- /greenLine -->

          </div>
          <!-- /memologo -->

          <!-- /contactsOptionsMenu -->
          <!-- /settingYourProfile -->
          <div class="chatRoom" style="z-index: -1">
            <ChatComponent :msgs="messagesByUsers" :getItem="reciverUser" :newCchat="newCchat"
              :checkUserConnet="checkUserConnet" :blockedUserInfo="blockedUserInfo" @calling="calling"
              @unblockUser="unblockUser" @displayMsgCover="displayMsgCover" @checkDate="checkDate"
              @editOrderMyChat="editOrderMyChat" v-if="!call">
            </ChatComponent>
          </div>
          <!-- /chatRoom -->
          <div class="contactsOptionsMenu" v-if="contactsOptionsMenu">
            <ContactOptionMenu v-if="!call" :data="dataForContactProfile" @closeContactsOptionsM="contactsOptionsM"
              @blockUser="blockUser" @unblockUser="unblockUser" />
          </div>
          <div class="settingYourProfile" v-if="settingYourProfile">
            <SettingsComponent v-if="!call" @closeListSetting="closeListSetting"
              @showArchiveContact="showArchiveContact" @showBlockList="showBlockList" />
          </div>
        </div>
        <!-- /rightSidebar -->

        <button class="showProfileUser">
          <div class="navUserProfile">
            <div class="closeUser" @click="closeUsrPrfile">
              <span></span>
              <span></span>
            </div>
            <!-- /closeUser -->
            {{ _trans("contatctInfo") }}
          </div>
          <!-- /navUserProfile -->
          <div class="infromationUserProfilr">
            <div class="imageUserProfile">
              <img v-if="pUsr && pUsr.profile_image" :src="pUsr.profile_image" />
              <img v-else src="../assets/uploads/image/default.png" />
            </div>
            <!-- /imageUserProfile -->
            <div class="nameAndNumber">
              <p v-if="pUsr.first_name" v-text="pUsr.first_name + ' ' + pUsr.last_name"></p>
              <p v-else>Memo User</p>
              <p v-if="pUsr.phone" v-text="pUsr.phone"></p>

              <div class="serialNumber" v-if="pUsr.sn" v-text="_trans('sn') + ' : ' + pUsr.sn"></div>
              <!-- /serialNumber -->
            </div>
            <!-- /nameAndNumber -->
          </div>
          <!-- /infromationUserProfilr -->
          <div class="aboutUserProfile">
            <div class="titleAbout">
              {{ _trans("about") }}
            </div>
            <p>
              {{ pUsr.status }}
            </p>
          </div>
          <!-- /aboutUserProfile -->

          <div class="mediaAnadLink">
            <div class="titleMediaAnadLink">
              <p>{{ _trans("mediaLinkDocument") }}</p>
              <p>{{ numberForUserMedia }} <fa icon="angle-right"></fa>
              </p>
            </div>
            <div class="cardsLinksAndT">
              <div class="mediaCar" v-for="item in forUserMedia" :key="item" @click.prevent="styFoucs">
                <div @click.prevent="goForMedia(item.message_id)">
                  <img :src="item.message" alt="" />
                </div>
              </div>
              <!-- /card -->
            </div>
            <!-- /cardsLinksAndT -->
          </div>
          <!-- /mediaAnadLink -->
        </button>
      </div>
      <!-- /sidebar -->
    </div>
    <!-- /containerr -->
    <RingingComponent v-if="call" class="closeCall" @answer="closeCall" :calldat="call" :audioObj="audioFile">
    </RingingComponent>

    <RedirectForContact v-if="!call && redirectMessage" :redirectMessage="redirectMessagess"></RedirectForContact>

    <DeleteMessagesComponent v-if="!call && deleteMsg" :messages="deleteMsg"></DeleteMessagesComponent>

    <AlertForBlockComponent v-if="item && payload" :item="item" :payload="payload" @unblockUser="unblockUser"
      @blockUser="blockUser"></AlertForBlockComponent>

    <AlertForDeleteAcount v-if="checkDeleteAcount" @cansel="deleteAcountActive" :data="checkDeleteAcount">
    </AlertForDeleteAcount>

    <div class="fullScreen" v-if="lng == 'en' && !fullScreen" @click="fullScreenFunction(true)">
      <fa icon="expand"></fa>
    </div>
    <div class="fullScreen" style="right:unset;left:30px" v-if="lng == 'ar' && !fullScreen"
      @click="fullScreenFunction(true)">
      <fa icon="expand"></fa>
    </div>

    <div class="fullScreen" v-if="lng == 'en' && fullScreen" @click="fullScreenFunction(false)">
      <fa icon="compress"></fa>
    </div>
    <div class="fullScreen" style="right:unset;left:30px" v-if="lng == 'ar' && fullScreen"
      @click="fullScreenFunction(false)">
      <fa icon="compress"></fa>
    </div>

    <!-- /fullScreen -->
  </div>
  <!-- /home -->
</template>

<script>

import ChatComponent from "./ChatComponent.vue";
import ContactOptionMenu from "./ContactOptionMenu.vue";
import SettingsComponent from "./SettingsComponent.vue";
import RingingComponent from "./RingingComponent.vue";
import RedirectForContact from "./RedirectForContact.vue";
import DeleteMessagesComponent from "./DeleteMessagesComponent.vue";
import ArchiveChatComponent from "./ArchiveChatComponent";
import BlockListComponent from "./BlockListComponent.vue";
import AlertForBlockComponent from "./AlertForBlockComponent.vue";
import AlertForDeleteAcount from "./AlertForDeleteAcount.vue";
import checkDubole from "../assets/uploads/image/check-dubole.png";
import checkImageNotSeen from "../assets/uploads/image/check-image-not-seen.png";
import check from "../assets/uploads/image/check.png";
import Peer from "peerjs";

/* this axios used for upload new ImageProfile */
import axios from "axios";
import * as cookie from "vue-cookies";
import moment from "moment";
import _ from "lodash";
import store from "../store/index";
import newMessage from "../assets/uploads/audio/newMessage.mp3";
import obj from "../lang/changeNumber.js"

var serachInput = false;
var searchV = null;
/* var searchInpuMsg */
export default {
  data() {
    return {
      item: null,
      payload: null,
      contactsOptionsMenu: false,
      dataForContactProfile: {},
      settingYourProfile: false,
      messagesByUsers: null,
      io: this.$store.state.socket,
      l_: this.$store.getters.words,
      reciverUser: null,
      call: null,
      answerChat: null,
      showSetting: false,
      fileImg: null,
      user: cookie.get("user") || {},
      imagProfilePath:
        this.$store.state.imgProfilePath + cookie.get("user").profile_image ||
        null,
      displayInput: null,
      username:
        cookie.get("user").first_name + " " + cookie.get("user").last_name,
      countInputFL: 26,
      status: cookie.get("user").status,
      serachUser: "",
      newCchat: null,
      reciveMyChat: [],
      redirectMessagess: {},
      deleteMsg: null,
      sndRcvId: [],
      scrollTop: null,
      myContactUser: [],
      pUsr: {},
      numberForUserMedia: 0,
      forUserMedia: [],
      checkArchive: null,
      checkUserConnet: [],
      fcmToken: {
        to: null, //here i will take token for reciver user and put him here
        content_available: true,
        priority: "high",
        data: {},
      } /* /fcmToken */,
      sn: null,
      blockList: null,
      typeOfBlock: "block",
      blockedUserInfo: [],
      checkDeleteAcount: false,
      displayMsgCoverr: false,
      inputValueForSearchMsg: "",
      lng: cookie.get("lang") || "en",
      fullScreen: false,
      displayReply: false,
      //audioFile: null,
      searchLoader: null
    }; /* end of return */
  } /* end of data */,

  components: {
    ChatComponent,
    ContactOptionMenu,
    SettingsComponent,
    RingingComponent,
    RedirectForContact,
    DeleteMessagesComponent,
    ArchiveChatComponent,
    BlockListComponent,
    AlertForBlockComponent,
    AlertForDeleteAcount,
  } /* end of components */,

  created() {
    this.connectPeerjs();
    this.connectioPeer();
  },/* /this.connectPeerjs(); */
  mounted: function () {
    this.darkMode();
    this.checkMode();
    this.myChat();
    this.myProfile();
    this.checkLang();
    this.calling();
    this.closeCall();
    this.yourStatus();
    this.newProfileImage();
    this.newChat();
    this.deleteConversation();
    this.deleteMessageFromReciver();
    this.scrollComputed();
    this.updatOnSerialNumberForMyProfile();
    //this.zoomInAndOutContactSide();
    //this.checkUsersConnection();
    //this.checkConnect();
    this.resizePage();
    this.block();
    this.unblock();
    this.getresulteSearchMsg();
    this.editOrderMyChat();
  } /* end of mounted */,
  computed: {

    // displyReplyForm() {
    //   if (this.$store.state.reply.disply) {
    //     return this.$store.state.reply
    //   }/* end of if */
    //   return null;
    // },/* /displyReplyForm */

    blockUserInfo() {
      if (this.$store.state.blockUserInfo.length) {
        return this.$store.state.blockUserInfo;
      } /* end of if */
      return null;
    } /* /blockUserInfo */,
    getBlockedUsers() {
      if (this.$store.getters.blockedUsers) {
        if (this.$store.getters.blockedUsers.length > 0) {
          this.$store.getters.blockedUsers.forEach((element) => {
            if (element.profile_image && !element.cc) {
              element.profile_image =
                this.$store.state.imgProfilePath + element.profile_image;
              element.cc = true;
            } /* end of if */
          });
          return this.$store.getters.blockedUsers;
        } else {
          return null;
        } /* end of if */
      } else {
        return null;
      } /* end of if  */
    } /* /getBlockedUsers */,
    removedItemm() {
      if (this.$store.state.removedItem) {
        return this.$store.state.removedItem;
      } else {
        return null;
      } /* end of if */
    } /* /removedItemm */,

    mediaResult() {
      if (store.state.userMedia) {
        return store.state.userMedia;
      } else {
        return null;
      } /* end of if */
    } /* /mediaResult */,
    userProfile() {
      if (this.$store.state.userProfile) return this.$store.state.userProfile;
      return null;
    } /* /userProfile */,
    conntactUser() {
      if (this.$store.getters.myChat2) {
        return this.$store.getters.myChat2;
      } /* /conntactUser */
      return null;
    } /* /conntactUser */,
    reciveMyChatt() {
      if (this.$store.getters.myChat) {
        if (this.$store.getters.myChat.length > 0) {
          this.$store.getters.myChat.forEach((item) => {
            if (!item.formatDate) {
              item.created_at = this.checkFormatDate(item);
              item.formatDate = true
            }/* end of if */

            if (item.image && !item.c) {
              item.image = this.$store.state.imgProfilePath + item.image;
              item.c = true;
            } /* end of if */
          }); /* end of for each */

          //this section o detrmain who is sender and reciver id
          if (cookie.get("user")) {
            this.$store.getters.myChat.forEach((value, index) => {
              if (!this.$store.getters.myChat[index].gg) {
                if (cookie.get("user").id == value.reciver_id) {
                  this.sndRcvId[index] = {
                    snd_id: value.reciver_id,
                    rcv_id: value.sender_id,
                  };
                } else {
                  this.sndRcvId[index] = {
                    snd_id: value.sender_id,
                    rcv_id: value.reciver_id,
                  };
                } /* end if if */
              } else {
                if (cookie.get("user").id == value.reciver_id) {
                  this.sndRcvId.push({
                    snd_id: value.reciver_id,
                    rcv_id: value.sender_id,
                  });
                } else {
                  this.sndRcvId.push({
                    snd_id: value.sender_id,
                    rcv_id: value.reciver_id,
                  });
                } /* end if if */
              } /* end of if */
            }); /* end of forEach */
          } /* end of if */
          return this.$store.getters.myChat;
        } else {
          return [];
        } /* end of if */
      } else {
        return [];
      }
    } /* end of reciveMyChat */,

    caradId() {
      if (this.$store.state.caradId) {
        return this.$store.state.caradId;
      } /* end of if */
      return null;
    } /* /caradId */,

    getMessageByUsers() {
      if (this.$store.getters.getMessageByUser) {
        return this.$store.getters.getMessageByUser;
      } else {
        return null;
      } /* end of if */
    } /* /getMessageById */,

    countInputFnameLname() {
      var len = this.countInputFL - this.username.length;
      if (len < 0) {
        return 0;
      }
      return len;
    } /* /username */,

    redirectMessage() {
      if (this.$store.state.redirectMessages) {
        return this.$store.state.redirectMessages;
      } /* end of if */
      return null;
    } /* /redirectMessages */,

    deleletedMessage() {
      if (this.$store.state.deleteMessages) {
        return this.$store.state.deleteMessages;
      } else {
        return null;
      } /* end of if */
    } /* /deleletedMessage */,

    deleteConversationResultes() {
      if (this.$store.state.deleteConversationResulte.length) {
        return this.$store.state.deleteConversationResulte;
      } else {
        return null;
      } /* end od if */
    } /* end of  deleteConversationResulte */,

    deleteInfoToSearchInput() {
      if (this.$store.state.delteInfoUserInput) {
        return this.$store.state.delteInfoUserInput;
      } /* end of if */
      return false;
    } /* end of if */,

    pageNums() {
      if (this.$store.state.page_nums) return this.$store.state.page_nums;
      else return null;
    } /* /pageNums */,

    widthforZoom() {
      if (store.state.widthforZoom) return store.state.widthforZoom;
      return null;
    } /* /widthforZoom */,

    checkSearchLoader() {
      if (this.$store.state.searchLoader) {
        return true
      }/* /searchLoader */
      return false
    },/* /checkSearchLoader */
  } /* /computed */,
  watch: {

    //this function for display and hidden the loader
    checkSearchLoader(x) {
      this.searchLoader = x
    },/* /checkSearchLoader */

    inputValueForSearchMsg(x) {
      if (x.length > 1)
        this.sendSearchMsgValue(x, this.io)
      else {
        document.getElementsByClassName("cardWepperSearcher")[0].innerHTML = ""
      }/* end of if */
    }/* /inputValueForSearchMsg */,

    //this function used for take info if happend any change in the list blockUserInfo
    blockUserInfo(x) {
      if (x) {
        this.blockedUserInfo = x;
      } else {
        this.blockedUserInfo = [];
      } /* end of if */
    } /* /blockUserInfo */,

    //this function to get all blocked users and then send him to blockeUserList component
    getBlockedUsers(x) {
      this.blockList = x;
    } /* /getBlockedUsers */,

    //this function used when i do delete element and display element become none
    removedItemm(x) {
      x.forEach((el) => {
        console.log(el);
        //var carad=document.getElementById()
      }); /* /forEach */
    } /* /removedItem */,

    //this function to fetch media bettwen two user sender and reciver when sender open profile for reciver user
    mediaResult(x) {
      if (x) this.numberForUserMedia = x.length;
      this.forUserMedia = [];
      for (var i = 0; i < x.length; i++) {
        x[i].message = this.$store.state.imgPath + x[i].message;
        this.forUserMedia.push(x[i]);
      } /* end of for loop */
    } /* /mediaResult */,

    //this function to get user profile
    userProfile(x) {
      if (x) {
        if (x.profile_image)
          x.profile_image = this.$store.state.imgProfilePath + x.profile_image;
        if (x.sn) {
          var fl = "";
          var mdl = "";
          var mdl2 = "";
          var lastl = "";
          fl = x.sn[0];
          for (var i = 1; i < x.sn.length - 6; i++) {
            mdl2 = mdl2 + x.sn[i];
          } /* end of for loop */

          for (var m = x.sn.length - 6; m < x.sn.length - 3; m++) {
            mdl = mdl + x.sn[m];
          } /* end of for loop */

          for (var l = x.sn.length - 3; l < x.sn.length; l++) {
            lastl = lastl + x.sn[l];
          } /* end of for loop */

          x.sn = fl + "-" + mdl2 + "-" + mdl + "-" + lastl;
        } /* end of if */
        this.pUsr = x;
      } /* end of if */
    } /* /userProfile */,

    //this function to get state for contact user if active or no
    conntactUser(x) {
      if (x) {
        var vv = 0;
        x.forEach((el) => {
          if (cookie.get("user")) {
            if (cookie.get("user").id == el.sender_id) {
              vv = el.reciver_id;
            } else if (cookie.get("user").id == el.reciver_id) {
              vv = el.sender_id;
            } /* end of if */
            this.myContactUser.push({
              user_id: vv,
              chat_id: el.id,
            });
          } /* end of if */
        }); /* end of forEach */

        // if (!this.serachUser)
        //   this.io.emit("ammar user", {
        //     userArr: this.myContactUser,
        //     myId: cookie.get("user").id || null,
        //   });
      } /* end of if */
    } /* /conntactUser */,
    //this function used for save change width left side is the contact list
    // widthforZoom(x) {
    //   var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
    //   leftSideBar.style.width = x + "px";
    // } /* /widthforZoom */,

    //this function used when take element from search but the displed element dot display all and i have page number
    pageNums(x) {
      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var contactList = leftSideBar.children[3].children[0];
      var wepperCard = leftSideBar.children[3].children[0].children[0];

      /* var page = 2; */
      var srch = setInterval(() => {
        if (
          wepperCard.getBoundingClientRect().bottom <=
          contactList.getBoundingClientRect().bottom
        ) {
          if (this.$store.state.page <= x) {
            store.dispatch("searchUser", {
              searchValue: searchV,
              sercherId: cookie.get("user").id,
              page: store.state.page,
            });
          } else {
            clearSrch();
          } /* end of if */
        } else {
          clearSrch();
        } /* end of if */
      }, 700);

      function clearSrch() {
        clearInterval(srch);
      } /* end of clearSrch */
    } /* end of pageNums */,

    //this function to remove searchUser
    deleteInfoToSearchInput(x) {
      if (x) {
        this.serachUser = "";
        this.$store.state.delteInfoUserInput = false;
      } /* end of if */
    } /* /deleteInfoToSearchInput */,

    //this function to send aeffect to other user this conversation must be delete
    deleteConversationResultes(x) {
      var contactList = document.getElementsByClassName("contactList")[0];
      for (var i = 0; i < contactList.children[0].length; i++) {
        x.forEach((el) => {
          var id = contactList.children[0].children[i].getAttribute("id");
          console.log(el.chat_id, id);
        }); /* end of forEach */
      } /* end of for loop */
    } /* /deleteConversationResulte */,

    //this function for send every redirect message id to redirectForContact component
    redirectMessage(x) {
      if (x) {
        this.redirectMessagess = x;
      } /* end of if */
    } /* /redirectMessages */,

    //this function every deleted message for deleteMessageComponenet
    deleletedMessage(x) {
      if (x) {
        this.deleteMsg = x;
      } else {
        this.deleteMsg = null;
      } /* end of if */
    } /* /deleletedMessage */,

    reciveMyChatt(x) {
      if (x) {
        if (x.length > 0) {
          this.reciveMyChat = [];
          setTimeout(() => {
            this.reciveMyChat = x;
          }, 200);
          this.checkDisplayList();

        } else this.reciveMyChat = [];
      } /* end of if */
    } /* /reciveMyChatt */,

    //this function used when do new chat between two user
    caradId(x) {
      if (x) {
        for (var i = 0; i < this.$store.getters.myChat.length; i++) {
          if (x[1].reciver_id == this.$store.getters.myChat[i].id) {
            this.$store.getters.myChat[i].chatRoom = [{}];
            this.$store.getters.myChat[i].chatRoom[0].reciver_id =
              x[1].reciver_id;
            this.$store.getters.myChat[i].chatRoom[0].sender_id =
              x[1].sender_id;
            this.$store.getters.myChat[i].chatRoom[0].id = x[0];
          } /* end of if */
        } /* end of for loop */
        this.reciveMyChat = [];
        this.reciveMyChat = this.$store.getters.myChat;
      } /* end of if */
    } /* /caradId */,

    //this function to get all message between two sender and reciver user
    getMessageByUsers(x) {
      //this section to create fcmToken this param use for send notifuction for mobile appliction
      var data = {
        title: null, //this for username reciver user
        body: null, //this for message content
        image: null, //this for image sender user
        chat_id: null, //this for chat id between sender and reciver user
        type: null, //type of message
      }; /* fcmToken */

      var rcevId = null;

      if (cookie.get("sndRcvId")) {
        if (cookie.get("user")) {
          if (cookie.get("user").id == cookie.get("sndRcvId").sender_id) {
            rcevId = cookie.get("sndRcvId").reciver_id;
          } else {
            rcevId = cookie.get("sndRcvId").sender_id;
          } /* end of if */
        } /* end of if */
      } /* end of if */

      var rcvObj = [];
      rcvObj = this.$store.state.myChat.filter((value) => {
        if (value.chatRoom) {
          if (rcevId == value.chatRoom[0].sender_id) {
            return value;
          } else if (rcevId == value.chatRoom[0].reciver_id) {
            return value;
          } /* end of if */
        } else if (value.sender_id || value.reciver_id) {
          if (rcevId == value.sender_id) {
            return value;
          } else if (rcevId == value.reciver_id) {
            return value;
          } /* end of if */
        } else if (rcevId == value.id) return value;
      });

      data.title =
        cookie.get("user").first_name + " " + cookie.get("user").last_name;
      data.image = cookie.get("user").profile_image || null;

      //if the mychat is null that mean i opened archive list
      if (rcvObj.length <= 0) {
        rcvObj = this.$store.state.rchiveConversations.filter((value) => {
          if (value.chatRoom) {
            if (rcevId == value.chatRoom[0].sender_id) {
              return value;
            } else if (rcevId == value.chatRoom[0].reciver_id) {
              return value;
            } /* end of if */
          } else if (value.sender_id || value.reciver_id) {
            if (rcevId == value.sender_id) {
              return value;
            } else if (rcevId == value.reciver_id) {
              return value;
            } /* end of if */
          } else if (rcevId == value.id) return value;
        });
      } /* /end of if  */

      if (rcvObj[0].chatRoom) data.chat_id = rcvObj[0].chatRoom[0].id;
      else if (rcvObj[0].sender_id) data.chat_id = rcvObj[0].id;

      this.fcmToken.data = data;
      this.fcmToken.to = rcvObj[0].token || rcvObj[0].user_token;

      if (cookie.get("fcmToken")) cookie.remove("fcmToken");
      cookie.set("fcmToken", this.fcmToken);

      const memologo = document.getElementsByClassName("memologo")[0];
      memologo.style.display = "none";
      const chatRoom = document.getElementsByClassName("chatRoom")[0];
      chatRoom.style.zIndex = "3";
      this.messagesByUsers = x;
    } /* /getMessageByUser */,

    //this function to make delay for search operation
    serachUser: _.debounce((x) => {
      if (x.length > 0) {
        serachInput = true;

        if (store.state.page == 1) {
          var contactList = document.getElementsByClassName("contactList")[0];
          contactList.scrollTop =
            contactList.scrollHeight - contactList.scrollHeight;
        } /* end of if */

        /* scrollTop=contactList.scrollTop */
        searchV = x;
        store.dispatch("searchUser", {
          searchValue: x,
          sercherId: cookie.get("user").id,
          page: store.state.page,
        });
      } else {
        serachInput = false;
        const user = cookie.get("user");
        var payload = { user_id: user.id };
        store.dispatch("myContact", payload);
        store.state.page = 1;
      } /* end of if */
    }, 1000) /* /debounce */ /* ,serachUser */,
  } /* /watch */,
  methods: {
    //this function for convert format number 
    convertFormatNumber(num) {
      return obj.changeFomat(num)
    },/* /convertFormatNumber */

    //this function to reorder for my conversations and new chat
    editOrderMyChat(itm) {
      if (this.$store.state.myChat.length > 0) {
        if (this.$store.state.myChat[0] != itm) {
          var mynewChat = this.$store.state.myChat.filter(value => {
            return value == itm
          })/* /filter */

          var myChat = this.$store.state.myChat.filter(value => {
            return value != itm
          })/* /filter */

          var myChatt = []

          for (var i = 0; i < myChat.length; i++) {
            myChatt[i + 1] = myChat[i]
          }/* end of for loop */

          myChatt[0] = mynewChat[0]

          this.$store.state.myChat = myChatt

        }/* end of if */
      }/* end of if */
    }/* /mychat */,

    //this function to display my screen on all page
    fullScreenFunction(check) {

      var docEl = document.getElementById("app")
      var doc = window.document;
      var requestFullScreen = null;
      var cancelFullScreen;

      this.fullScreen = check
      if (check) {
        requestFullScreen =
          docEl.requestFullscreen ||
          docEl.mozRequestFullScreen ||
          docEl.webkitRequestFullScreen ||
          docEl.msRequestFullscreen;
      } else {
        cancelFullScreen =
          doc.exitFullscreen ||
          doc.mozCancelFullScreen ||
          doc.webkitExitFullscreen ||
          doc.msExitFullscreen;
      }/* end of if */

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl);
      } else {
        cancelFullScreen.call(doc);
      }

    }/* /fullScreenFunction */,
    //this function used for check connection for the user 
    checkDate(data) {
      var stateUser = document.getElementsByClassName("stateUser")[0]
      stateUser.innerHTML = ""
      stateUser.innerHTML = this._trans("lastseen") + "  " + `<div class="lastSeen">${" " + this.checkFormatDate(data) + " "}</div>`
    }/* /checkDate */,

    //this function used to create object from peer
    connectioPeer() {
      var peer = new Peer(undefined, {
        key: "peerjs",
        host: "mypeerjs3002.herokuapp.com",
        secure: true,
        port: 443,
      });
      this.$store.state.peer = peer
    },/* /connectioPeer */

    //this function used for get resulte for search message 
    getresulteSearchMsg() {
      this.io.on("msg search", data => {
        //this paert wepper
        var cardWepperSearcher = document.getElementsByClassName("cardWepperSearcher")[0]
        cardWepperSearcher.innerHTML = ""
        data.result.forEach(msg => {
          var fullString = null
          var i = 0

          //this cardSearcher is child for wepper
          var cardSearcher = document.createElement("a")
          cardSearcher.classList.add("cardSearcher")

          //this two child for cardSearcher
          var dateCard = document.createElement("div")
          dateCard.classList.add("dateCard")

          var containMssageSearcher = document.createElement("div")
          containMssageSearcher.classList.add("containMssageSearcher")

          //this two child for containMssageSearcher
          var stateMsgSearcher = document.createElement("div")
          stateMsgSearcher.classList.add("stateMsgSearcher")

          var msgText = document.createElement("div")
          msgText.classList.add("msgText")

          //this tag img for stateMsgSearcher
          var img = document.createElement("img")


          for (i; i < msg.message.length; i++) {
            if ((msg.message[i] == data.orginalmsg[0]) && ((msg.message.length - 1) - i >= data.orginalmsg.length - 1)) {

              //here i will get the string which have same search value
              var str = null
              for (var j = i; j <= (i + data.orginalmsg.length - 1); j++) {
                if (!str)
                  str = msg.message[j]
                else
                  str += msg.message[j]
              }/* end of j */
              if (!fullString)
                fullString = `<span class="matchVal">${str}</span>`
              else
                fullString += `<span class="matchVal">${str}</span>`
              i = i + data.orginalmsg.length - 1
            } else {
              if (!fullString)
                fullString = msg.message[i]
              else
                fullString += msg.message[i]
            }/* end of for loop */
          }/* end of for loop */
          msgText.innerHTML = fullString

          if (msg.state == 3) {
            img.src = checkDubole
          } else if (msg.state == 2) {
            img.src = checkImageNotSeen
          } else if (msg.state == 1) {
            img.src = check
          }/* end of if */


          stateMsgSearcher.appendChild(img)
          containMssageSearcher.appendChild(stateMsgSearcher)
          containMssageSearcher.appendChild(msgText)
          dateCard.textContent = this.checkFormatDate(msg)
          cardSearcher.appendChild(dateCard)
          cardSearcher.appendChild(containMssageSearcher)

          cardWepperSearcher.appendChild(cardSearcher)

          cardSearcher.onclick = function () {
            var wepperChat = document.getElementsByClassName("wepper-chat")[0]
            for (var k = 0; k < wepperChat.children.length; k++) {
              if (wepperChat.children[k].classList.contains("myMessageCover") || wepperChat.children[k].classList.contains("messageYouCover")) {
                if (wepperChat.children[k].children[0].getAttribute("id") == msg.message_id) {
                  wepperChat.children[k].children[0].classList.remove("addAnimationColor")
                  //wepperChat.scrollTo(0,wepperChat.clientHeight - wepperChat.children[k].getBoundingClientRect().top)//(wepperChat.clientHeight - wepperChat.children[k].getBoundingClientRect().top+100)*-1
                  wepperChat.children[k].parentNode.scrollTop = wepperChat.children[k].offsetTop - 5;
                  wepperChat.children[k].children[0].classList.add("addAnimationColor")
                }/* end of if  */
              }/* end of if */
            }/* end of for lopp */

            if (window.outerWidth < 900) {
              var sidebar = document.getElementsByClassName("sidebar")[0]
              sidebar.children[0].style.display = "none"
              sidebar.children[1].style.display = "block"
            }/* end of if */

          }/* /foucs function  */

        })/* end of forEach */


        // function checkOverflow(el) {
        //   var curOverflow = el.style.overflow;

        //   if (!curOverflow || curOverflow === "visible")
        //     el.style.overflow = "hidden";

        //   var isOverflowing = el.clientWidth < el.scrollWidth
        //     || el.clientHeight < el.scrollHeight;

        //   el.style.overflow = curOverflow;

        //   return isOverflowing;
        // }

      })/* /msg search */
    },/* /getresulteSearchMsg */

    //this function used for send value to server 
    sendSearchMsgValue: _.debounce((x, io) => {
      var payload = {
        my_id: cookie.get("user").id,
        sender_id: cookie.get("sndRcvId").sender_id,
        reciver_id: cookie.get("sndRcvId").reciver_id,
        msg: x
      }/* /payload */
      io.emit("msg search", payload)
    }, 2000),/* /sendSearchMsgValue */

    //this function used for add animation for arrow 
    addaAnimationForArrow(x) {
      var deleteArrow = document.getElementsByClassName("deleteArrow")[0]
      var search = document.getElementsByClassName("searchInputMsg")[0]

      if (x == true) {
        deleteArrow.style.visibility = "visible"
        search.style.visibility = "hidden"
      } else if (x == false) {
        deleteArrow.style.visibility = "hidden"
        search.style.visibility = "visible"
      }/* end of if */
    }/* /addaAnimationForArrow */,

    //closeSearchMsg this function used for close window 
    closeSearcherMsg(x) {
      var sidebar = document.getElementsByClassName("sidebar")[0]
      if (!x) {
        sidebar.children[0].style.display = "none"
        sidebar.children[1].style.display = "block"
      }/* end of if */
      this.inputValueForSearchMsg = ""
    }/* /displayMsgCoverr */,

    //this function used for displae searcherMsg
    displayMsgCover(x) {
      var sidebar = document.getElementsByClassName("sidebar")[0]
      if (x) {
        sidebar.children[0].style.display = "flex"
        sidebar.children[1].style.display = "none"
      }/* end of if */
    }/* /displayMsgCover */,

    //this function used for check format date
    checkFormatDate(data) {
      var dateMsg = null;
      for (var i = 0; i < 10; i++) {
        if (data.dateTime) {
          if (dateMsg) dateMsg += data.dateTime[i];
          else dateMsg = data.dateTime[i];
        } else if (data.created_at) {
          if (dateMsg) dateMsg += data.created_at[i];
          else dateMsg = data.created_at[i];
        } /* end of if */
      } /* end of for loop */
      var lastMsgDate = new Date(parseInt(dateMsg) * 1000);
      var currentDate = new Date();

      //must convert to date time
      // in same day only the time 11:5pm
      //yestrday
      //normal date 9/5/2021

      if (
        lastMsgDate.getMonth() + 1 == currentDate.getMonth() + 1 &&
        lastMsgDate.getFullYear() == currentDate.getFullYear() &&
        lastMsgDate.getDate() == currentDate.getDate()
      ) {
        //this section used for check the date is in same current date
        if (cookie.get("lang") == 'ar')
          return obj.changeNumberFormat(moment(lastMsgDate).format("LT"));
        else
          return moment(lastMsgDate).format("LT")
      } else if (
        lastMsgDate.getMonth() + 1 == currentDate.getMonth() + 1 &&
        lastMsgDate.getFullYear() == currentDate.getFullYear() &&
        lastMsgDate.getDate() + 1 == currentDate.getDate()
      ) {
        //this section used for check the date is yestarday or no
        return this._trans("yesterday");
      } else {
        //this section for old date
        if (cookie.get("lang") == 'ar')
          return obj.changeNumberFormat(moment(lastMsgDate).format("YYYY/MM/DD"));
        else
          return moment(lastMsgDate).format("YYYY/MM/DD")
      } /* end of if */
    } /* /checkFormatDate */,

    //this function to display alert for delete acooutn
    deleteAcountActive(x) {
      if (x) {
        this.checkDeleteAcount = true;
      } else {
        this.checkDeleteAcount = false;
      } /* end of if */
    } /* /deleteAcountActiv */,

    //this function used for add unblock to outher user
    unblock() {
      this.io.on("unblock", (data) => {
        if (cookie.get("user").id == data.user_id) {
          console.log("data : ", data);
          this.$store.state.unBlockUserInfo[data.my_id] = data;
          this.$store.state.blockUserInfo =
            this.$store.state.blockUserInfo.filter((value) => {
              if (value != this.$store.state.blockUserInfo[data.my_id])
                return value;
            }); /* /filter */
        } /* end of if */
      }); /* end of block emit */
    } /* /unblock */,

    //this function used for add block to outher user
    block() {
      this.io.on("block", (data) => {
        if (cookie.get("user").id == data.user_id) {
          console.log("data : ", data);
          data.item = {
            item: data.item,
          };
          this.$store.state.blockUserInfo[data.my_id] = data;

          this.$store.state.unBlockUserInfo =
            this.$store.state.unBlockUserInfo.filter((value) => {
              if (value != this.$store.state.unBlockUserInfo[data.my_id])
                return value;
            }); /* /filter */
        } /* end of if */
      }); /* end of block emit */
    } /* /block */,

    //this function to make emit on contactOptionmenu for block user
    blockUser(payload, data, check) {
      this.payload = payload;
      this.item = data;

      if (check == true) {
        this.$store.dispatch("blockUser", payload);

        if (this.dataForContactProfile.item)
          if (!this.dataForContactProfile.item.blocked) {
            if (!this.dataForContactProfile.item.archive) {
              this.$store.state.myChat.forEach((el) => {
                if (el == this.dataForContactProfile.item) {
                  (el.blocked = true),
                    (el.blocked_for = String(cookie.get("user").id));
                } /* end of if  */
              }); /* end if forEach */
            } else if (this.dataForContactProfile.item.archive == true) {
              this.$store.state.rchiveConversations.forEach((el) => {
                if (el == this.dataForContactProfile.item) {
                  (el.blocked = true),
                    (el.blocked_for = String(cookie.get("user").id));
                } /* end of if  */
              }); /* end if forEach */
            } /* end of if */
          } /* end of if */

        payload.item = {
          blocked: this.item.item.blocked,
          blocked_for: this.item.item.blocked_for,
        };

        //this pramiters for android application
        payload.userDoBlockName =
          this.item.item.username ||
          this.item.item.first_name + " " + this.item.item.last_name;
        payload.userDoBlockSpecialNumber = this.item.item.sn;
        payload.userDoBlockImage =
          this.item.item.image || this.item.item.profile_image || null;

        payload.blocked_for = payload.item.blocked_for;
        this.io.emit("block", payload);

        this.payload = null;
        this.item = null;
      } else if (check == false) {
        this.payload = null;
        this.item = null;
      } /* end of if */
    } /* /blockUser */,

    //this function take emit from Block component for unblockUser
    unblockUser(payload, item, check) {
      this.item = item;
      this.payload = payload;

      if (check == true) {
        if (this.dataForContactProfil) {
          if (this.dataForContactProfile.item.blocked) {
            if (!this.dataForContactProfile.item.archive) {
              this.$store.state.myChat.forEach((el) => {
                if (el == this.dataForContactProfile.item) {
                  if (this.dataForContactProfile.item.blocked_for == "0") {
                    el.blocked_for = "aaaa";
                    el.blocked = true;
                  } else {
                    el.blocked_for = null;
                    el.blocked = false;
                  } /* end of if */
                  payload.item = el;
                  //this pramiters for android application
                  payload.userDoBlockName =
                    payload.item.username ||
                    payload.item.first_name + " " + payload.item.last_name;
                  payload.userDoBlockSpecialNumber = payload.item.sn;
                  payload.userDoBlockImage =
                    payload.item.image || payload.item.profile_image;
                } /* end of if */
              }); /* end if forEach */
            } else if (this.dataForContactProfile.item.archive == true) {
              this.$store.state.rchiveConversations.forEach((el) => {
                if (el == this.dataForContactProfile.item) {
                  if (this.dataForContactProfile.item.blocked_for == "0") {
                    el.blocked_for = "aaaa";
                    el.blocked = true;
                  } else {
                    el.blocked_for = null;
                    el.blocked = false;
                  } /* end of if */
                  payload.item = el;
                  //this pramiters for android application
                  payload.userDoBlockName =
                    payload.item.username ||
                    payload.item.first_name + " " + payload.item.last_name;
                  payload.userDoBlockSpecialNumber = payload.item.sn;
                  payload.userDoBlockImage =
                    payload.item.image || payload.item.profile_image;
                } /* end of if */
              }); /* end if forEach */
            } /* end of if */
            payload.blocked_for = payload.item.blocked_for;
            this.io.emit("unblock", payload);
          } /* end of if */
        } else if (item.item) {
          if (!item.item.archive) {
            this.$store.state.myChat.forEach((el) => {
              if (el == item.item) {
                if (item.item.blocked_for == "0") {
                  el.blocked_for = "aaaa";
                  el.blocked = true;
                } else {
                  el.blocked_for = null;
                  el.blocked = false;
                } /* end of if */
                payload.item = el;
                payload.userDoBlockName =
                  payload.item.username ||
                  payload.item.first_name + " " + payload.item.last_name;
                payload.userDoBlockSpecialNumber = payload.item.sn;
                payload.userDoBlockImage =
                  payload.item.image || payload.item.profile_image;
              } /* end of if */
            }); /* end if forEach */
          } else if (item.item.archive == true) {
            this.$store.state.rchiveConversations.forEach((el) => {
              if (el == item.item) {
                if (item.item.blocked_for == "0") {
                  el.blocked_for = "aaaa";
                  el.blocked = true;
                } else {
                  el.blocked_for = null;
                  el.blocked = false;
                } /* end of if */
                payload.item = el;
                payload.userDoBlockName =
                  payload.item.username ||
                  payload.item.first_name + " " + payload.item.last_name;
                payload.userDoBlockSpecialNumber = payload.item.sn;
                payload.userDoBlockImage =
                  payload.item.image || payload.item.profile_image;
              } /* end of if */
            }); /* end if forEach */
          } /* end of if */
          this.io.emit("unblock", payload);
        } else if (!item.item && item) {
          this.$store.state.myChat.forEach((el) => {
            var id = null;

            if (el.sender_id == cookie.get("user").id) {
              id = el.reciver_id;
            } else {
              id = el.sender_id;
            } /* end of if */

            if (id == item.id) {
              if (el.blocked_for == "0") {
                el.blocked_for = "aaaa";
                el.blocked = true;
              } else {
                el.blocked_for = null;
                el.blocked = false;
              } /* end of if */
              payload.item = el;
              payload.userDoBlockName =
                payload.item.username ||
                payload.item.first_name + " " + payload.item.last_name;
              payload.userDoBlockSpecialNumber = payload.item.sn;
              payload.userDoBlockImage =
                payload.item.image || payload.item.profile_image;
            } /* end of if */
          }); /* end if forEach */
          this.io.emit("unblock", payload);
        } /* end of if */

        //console.log("this.dataForContactProfil : ",this.dataForContactProfil, " item.item : ",item.item," item : ",item)

        var cardBlockUser = document.querySelector(
          `div[blocked-id='${payload.user_id}']`
        );

        if (cardBlockUser) {
          cardBlockUser.innerHTML = "";
          cardBlockUser.remove();
        } /* end of if */

        this.$store.dispatch("unblockUser", payload);

        if (this.$store.state.blockedUsers.length > 0) {
          this.$store.state.blockedUsers =
            this.$store.state.blockedUsers.filter((value) => {
              if (value.id != payload.user_id) return value;
            }); /* end of filter */
        } /* end of if */

        this.payload = null;
        this.item = null;
      } else if (check == false) {
        this.payload = null;
        this.item = null;
      } /* end of if */
    } /* /unblockUser */,

    //this function used for display block list component
    showBlockList(x) {
      var blockList = document.getElementsByClassName("blockList")[0];
      if (x) {
        blockList.style.display = "inline-block";
      } else {
        blockList.style.display = "none";
      } /* end of if */
    } /* /showBlockList */,

    //this function to add space between number for sereal number in my profile
    updatOnSerialNumberForMyProfile() {
      var fl = "";
      var mdl = "";
      var mdl2 = "";
      var lastl = "";
      fl = this.user.sn[0];
      for (var i = 1; i < this.user.sn.length - 6; i++) {
        mdl2 = mdl2 + this.user.sn[i];
      } /* end of for loop */

      for (var m = this.user.sn.length - 6; m < this.user.sn.length - 3; m++) {
        mdl = mdl + this.user.sn[m];
      } /* end of for loop */

      for (var l = this.user.sn.length - 3; l < this.user.sn.length; l++) {
        lastl = lastl + this.user.sn[l];
      } /* end of for loop */

      this.user.sn = fl + "-" + mdl2 + "-" + mdl + "-" + lastl;
    } /* /updatOnSerialNumber */,

    //this function when click on media betwwen users in profile make button on foucs and move for media in chat room
    goForMedia(x) {
      //window.location.href = x;

      var wepperChat = document.getElementsByClassName("wepper-chat")[0]
      for (var k = 0; k < wepperChat.children.length; k++) {
        if (wepperChat.children[k].classList.contains("myMessageCover") || wepperChat.children[k].classList.contains("messageYouCover")) {
          if (wepperChat.children[k].children[0].getAttribute("id") == x) {

            wepperChat.children[k].children[0].classList.remove("addAnimationColor")
            //wepperChat.scrollTo(0,wepperChat.clientHeight - wepperChat.children[k].getBoundingClientRect().top)//(wepperChat.clientHeight - wepperChat.children[k].getBoundingClientRect().top+100)*-1
            wepperChat.children[k].parentNode.scrollTop = wepperChat.children[k].offsetTop - 5;
            wepperChat.children[k].children[0].classList.add("addAnimationColor")

          }/* end of if  */
        }/* end of if */
      }/* end of for lopp */


      //window.outerWidth

      var showProfileUser =
        document.getElementsByClassName("showProfileUser")[0];
      showProfileUser.style.transition = "0s";

      if (window.outerWidth < 900) {
        showProfileUser.focus();
        setTimeout(() => {
          showProfileUser.blur();
        }, 10)
      } else {
        showProfileUser.focus();
      }/* end of if */

      //showProfileUser.style.transition="all .3s ease"
    } /* /styFoucs */,

    //this function profile for reciver item from archive list and displt him in nav chat room
    reciverUseer(x) {
      this.reciverUser = x;
    } /* /reciverUseer */,

    //this function to send effect to archive commponent you can display the page after take request from seeting component
    showArchiveContact(x) {
      this.checkArchive = x;
    } /* /showArchiveContact */,

    //this function used for hidden the user profile
    closeUsrPrfile() {
      var cl = document.getElementsByClassName("showProfileUser")[0];
      cl.blur();
    } /* /closeUsrPrfile */,

    // checkConnect() {
    //   var ccc = null;
    //   this.io.on("ammar user1", (data) => {
    //     /* console.log("user connection : ", data); */
    //     setTimeout(() => {
    //       this.$store.state.checkUserConnet =
    //         this.$store.state.checkUserConnet.filter((value) => {
    //           if (value.user_id != data.user_id) return value;
    //         }); /* /filter */
    //       this.$store.state.checkUserConnet.push(data);
    //       this.checkUserConnet = this.$store.state.checkUserConnet;

    //       var contactUser = document.getElementById(data.chat_id);

    //       if (!contactUser) {
    //         //this user id is actual is reciver_id
    //         contactUser = document.getElementById(data.user_id);
    //       } /* end of if */

    //       if (contactUser) {
    //         var userConnect = contactUser.children[1].children[0];
    //         userConnect.innerHTML = "";

    //         var span = null;
    //         clearInterval(ccc);
    //         if (data.connect == true) {
    //           span = document.createElement("div");
    //           span.innerHTML = "";
    //           span.style.width = "14px";
    //           span.style.height = "14px";
    //           span.style.borderRadius = "50%";
    //           span.style.background = "#3cab44";
    //           userConnect.appendChild(span);
    //         } else {
    //           span = document.createElement("div");
    //           span.innerHTML = "";
    //           var start = moment(new Date(parseInt(data.lastseen)));
    //           var end = moment(new Date());
    //           span.textContent = end.from(start, true);
    //           userConnect.appendChild(span);

    //           ccc = setInterval(() => {
    //             var userConnect = contactUser.children[1].children[0];
    //             userConnect.innerHTML = "";
    //             span.innerHTML = "";
    //             var end = moment(new Date());
    //             span.textContent = end.from(start, true);
    //             userConnect.appendChild(span);
    //           }, 60000);

    //           // if (contactUser.children[1].children[0].children[0])
    //           //   contactUser.children[1].children[0].innerHTML = "";

    //           // var start = moment(data.lastseen);
    //           // var end = moment(new Date());

    //           // var humanDate=end.from(start, true);
    //           // contactUser.children[1].children[0].textContent=humanDate
    //         } /* end of if */
    //       } /* end of if */
    //     }, 250);
    //   }); /* check connect ammar */
    // } /* /checkConnect */,

    //this function used to zoom in and zoom out for contact
    // zoomInAndOutContactSide() {
    //   var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
    //   var oldWidt = leftSideBar.offsetWidth;
    //   leftSideBar.addEventListener("mousemove", (e) => {
    //     if (
    //       leftSideBar.offsetWidth - e.x == 4 ||
    //       leftSideBar.offsetWidth - e.x == 3 ||
    //       leftSideBar.offsetWidth - e.x == 2 ||
    //       leftSideBar.offsetWidth - e.x == 1 ||
    //       leftSideBar.offsetWidth - e.x == 0
    //     ) {
    //       leftSideBar.style.cursor = "ew-resize";
    //       if (store.state.click == true) {
    //         leftSideBar.addEventListener("mousedown", function () {
    //           if (store.state.click == true) {
    //             updateXZoom();
    //           } /* end of if */
    //         }); /* end of function  */
    //         leftSideBar.addEventListener("mouseup", function () {
    //           store.state.click = true;
    //         }); /* end of function */
    //       }
    //     } else {
    //       leftSideBar.style.cursor = "default";
    //     } /* end of if */
    //   }); /* end of event listener */

    //   function updateXZoom() {
    //     document.body.onmousemove = (ee) => {
    //       if (store.state.click == true) {
    //         if (document.body.offsetWidth / 2 > leftSideBar.offsetWidth) {
    //           leftSideBar.style.width = ee.x + "px";
    //           if (ee.x < 200) {
    //             leftSideBar.style.width = 100 + "%";
    //           } /* end of if */
    //         } else {
    //           leftSideBar.style.width =
    //             document.body.offsetWidth / 2 - 3 + "px";
    //         } /* end of if */
    //         store.state.click = false;
    //         var newWidth = leftSideBar.offsetWidth;
    //         if (oldWidt != newWidth) {
    //           store.state.widthforZoom = newWidth;
    //         } /* end of if */
    //       } /* end of if */
    //     }; /* end of addEvenListener */
    //   } /* /updateXZoom */
    // } /* zoomInAndOutContactSide */,

    scrollComputed() {
      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var contactList = leftSideBar.children[3].children[0];
      contactList.addEventListener("scroll", function () {
        var wepperCard = leftSideBar.children[3].children[0].children[0];
        if (
          wepperCard.getBoundingClientRect().bottom <=
          contactList.getBoundingClientRect().bottom
        ) {
          if (store.state.page > 1) {
            store.dispatch("searchUser", {
              searchValue: searchV,
              sercherId: cookie.get("user").id,
              page: store.state.page,
            });
          } /* end of if */
        } /* end of if */
      }); /* end of addEventListener */
    } /* /scrollComputed */,

    //this function used to delete message from reciver
    deleteMessageFromReciver() {
      this.io.on("delete message", (data) => {
        if (data) {
          if (data.chat_id == cookie.get("sndRcvId").chat_id) {
            if (cookie.get("user").id == data.first_id) {
              this.$store.state.deleteState = false;
            } else if (
              this.user.id == data.second_id &&
              cookie.get("sndRcvId").chat_id == data.chat_id
            ) {
              //here i will delete this messages from reciver
              const wepperChat = document.querySelector(
                "div[chat_id='" + data.chat_id + "']"
              );

              var id = [];
              for (var i = 0; i < wepperChat.children.length; i++) {
                var messageId = null;
                if (wepperChat.children[i].children[0])
                  messageId =
                    wepperChat.children[i].children[0].getAttribute("id");

                id = JSON.parse(data.message_to_delete);

                for (var j = 0; j < id.length; j++) {
                  if (JSON.stringify(id[j]) == JSON.stringify(messageId)) {
                    if (i == wepperChat.children.length && i != 0) {
                      var contactList =
                        document.getElementsByClassName("contactList")[0];
                      var carad = contactList.children[0].children[0];
                      if (carad) {
                        carad.children[0].children[1].children[1].textContent =
                          wepperChat.children[
                            i - 1
                          ].children[0].children[0].textContent;
                      } else {
                        var carad2 = contactList.children[0].children[0];
                        carad2.children[0].children[1].children[1].textContent =
                          wepperChat.children[
                            i - 1
                          ].children[0].children[0].textContent;
                      } /* end of if */
                    } /* end of if */
                    id = id.filter((value) => {
                      return value != messageId;
                    });
                    wepperChat.children[i].innerHTML = "";
                    /* wepperChat.children[i].remove(); */
                  } /* end of if */
                } /* end of for loop j */
              } /* /end of for loop i*/

              for (var k = 0; k < wepperChat.children.length; k++) {
                if (!wepperChat.children[k].children[0])
                  wepperChat.children[k].remove();
              } /* end of for loop k*/
            } /* end of if */
          } /* end of if */
        } /* end of if */
      }); /* end of emit */
    } /* /deleteMessageFromReciver */,

    checkDisplayList() {
      var wpCard = document.getElementsByClassName("wepper-card")[0];
      for (var i = 0; i < wpCard.children.length; i++) {
        if (getComputedStyle(wpCard.children[i]).display == "none")
          wpCard.children[i].style.display = "flex";
      } /* end of for loop */
    } /* /checkDisplayList */,

    newChat() {
      this.io.on("new chat", (data) => {
        console.log("new chat : ", data);
        if (
          data.user.id == cookie.get("user").id &&
          data.message.sender_id == cookie.get("user").id
        ) {
          /* "sender_id":"5","reciver_id":"6","chat_id":nul */
          cookie.set("sndRcvId", {
            sender_id: data.message.sender_id,
            reciver_id: data.message.reciver_id,
            chat_id: data.chat_id,
          });

          if (!this.fcmToken.data.chat_id) {
            if (cookie.get("fcmToken")) cookie.remove("fcmToken");
            this.fcmToken.data.chat_id = data.chat_id;
            this.fcmToken.data.type = data.message.message_type;
            this.fcmToken.data.body = data.message.message;
            cookie.set("fcmToken", this.fcmToken);
          } /* end of if */

          this.$store.dispatch("sendNotfication", this.fcmToken);
        } /* end of if */
        this.sndRcvId = [];
        var newStrectuer = {};
        newStrectuer = data.message;
        newStrectuer.chat_id = data.chat_id;
        newStrectuer.user_data = data.user;
        this.newCchat = newStrectuer;

        const newChatt = {
          message_type: data.message.message_type,
          created_at: data.message.created_at,
          id: data.message.chat_id,
          image: data.user.profile_image,
          last_message: data.message.message,
          reciver_id: data.message.reciver_id,
          sender_id: data.message.sender_id,
          state: data.message.state,
          other_id: data.user.id,
          username: data.user.first_name + " " + data.user.last_name,
          gg: true,
        }; /* end of  newChatt object */

        if (!serachInput) {
          // this.$store.getters.myChat = this.$store.getters.myChat.filter(
          //   (value) => {
          //     if (value.id != newChatt.id) return value;
          //   }
          // ); /* /filter */

          //1- i will remove elemet
          var carad = document.getElementById(newChatt.id);
          if (carad) {
            carad.innerHTML = "";
            carad.remove();
          } /* end of if */
          if (this.$store.getters.myChat.length > 0) {
            var l1 = this.$store.getters.myChat;
            var l2 = [];
            for (var i = l1.length - 1; i >= 0; i--) {
              l2[i + 1] = l1[i];
              if (i == 0) {
                l2[i] = newChatt;
              } /* end of if */
            } /* end of for loop */
            //console.log(this.$store.state.myChat)
            this.$store.state.myChat = l2;
          } else {
            this.$store.state.myChat.push(newChatt);
          } /* end of if */
        } /* end of if */

        //here i will create new chat notifucation
        var audioObj = new Audio(newMessage);
        audioObj.muted = this.$store.state.mute;
        audioObj.addEventListener("canplaythrough", () => {
          /* the audio is now playable; play it if permissions allow */
          audioObj.play();
        });

        /* console.log("this new chat data :", data); */
      }); /* end of new chat */
    } /* /new chat */,

    showInput(x) {
      if (x == "input") {
        this.displayInput = "inputTure";
        /* var penInput=document.getElementById("penInput") */
      } else if (x == "status") {
        this.displayInput = "statusTrue";
      } /* end of if */
    } /* /showInput */,

    async closeInput(x) {
      if (x == "input") {
        this.displayInput = false;

        if (
          this.username.length <= 25 &&
          this.username !=
          cookie.get("user").first_name + " " + cookie.get("user").last_name
        ) {
          var fullName = this.username.split(" ");
          var first_name = fullName[0];
          var last_name = "";
          for (var i = 1; i < fullName.length; i++) {
            if (i == fullName.length - 1) {
              last_name += fullName[i];
              break;
            } /* end of if */
            last_name += fullName[i] + " ";
          } /* end of for loop */
          if (last_name != "") {
            first_name = fullName[0] + " ";
          } /* /end of if */
          this.username = first_name + last_name;
          /* var ex = new FormData();
          ex.append("id", cookie.get("user").id);
          ex.append("first_name", first_name);
          ex.append("last_name", last_name);
          ex.append("status", this.user.status); */

          var ex = {
            id: cookie.get("user").id,
            first_name: first_name,
            last_name: last_name,
            status: this.user.status,
          };
          var reslute = await axios
            .post(
              this.$store.state.pattUrl +
              this.$store.state.phpPort +
              "APIS/updateprofile.php",
              ex
            )
            .catch((err) => console.log(err));
          if (reslute) {
            cookie.remove("user");
            cookie.set("user", reslute.data.data);
            var displayNewId = document.getElementById("displayNewId");
            displayNewId.textContent = this.username;
            this.myProfile();
          } /* /reslute */
        } /* end of if  */

        this.username = this.user.first_name + " " + this.user.last_name;
      } else if (x == "status") {
        this.displayInput = false;
        if (cookie.get("user").status != this.status) {
          /* var ex2 = new FormData();
          ex2.append("id", cookie.get("user").id);
          ex2.append("status", this.status);
          ex2.append("first_name", this.user.first_name);
          ex2.append("last_name", this.user.last_name); */

          var ex2 = {
            id: cookie.get("user").id,
            status: this.status,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
          };

          var reslute2 = await axios
            .post(
              this.$store.state.pattUrl +
              this.$store.state.phpPort +
              "APIS/updateprofile.php",
              ex2
            )
            .catch((err) => console.log(err));
          var displayNewState = document.getElementById("displayNewState");
          displayNewState.textContent = this.status;
          if (reslute2) {
            cookie.remove("user");
            cookie.set("user", reslute2.data.data);
            this.myProfile();
          } /* end of if */
        } /* end of if */
      } /* end of if */
    } /* /closeInput */,

    showProfile() {
      const myProfile = document.getElementsByClassName("myProfile")[0];
      const mynav = document.getElementsByClassName("mynav")[0];
      const serachBar = document.getElementsByClassName("serachBar")[0];
      const wepperContactList =
        document.getElementsByClassName("wepperContactList")[0];

      if (this.showSetting == false) {
        myProfile.style.width = "100%";
        mynav.style.display = "none";
        serachBar.style.display = "none";
        wepperContactList.style.display = "none";
        myProfile.style.display = "inline-block";
        this.showSetting = true;
      } else if (this.showSetting == true) {
        myProfile.style.width = "0%";
        this.showSetting = false;
        myProfile.style.width = "100%";
        mynav.style.display = "flex";
        serachBar.style.display = "flex";
        wepperContactList.style.display = "flex";
        myProfile.style.display = "none";
      } /* end of if */
    } /* end of showProfile */,

    closeProfile() {
      const myProfile = document.getElementsByClassName("myProfile")[0];
      const mynav = document.getElementsByClassName("mynav")[0];
      const serachBar = document.getElementsByClassName("serachBar")[0];
      const wepperContactList =
        document.getElementsByClassName("wepperContactList")[0];
      if (this.showSetting == true) {
        this.showSetting = false;
        myProfile.style.width = "0%";
        mynav.style.display = "flex";
        serachBar.style.display = "flex";
        wepperContactList.style.display = "flex";
        myProfile.style.display = "none";
      }
    } /* /closeProfile */,

    closeCall(x) {
      if (x != null) {
        this.call = null;
      } /* end of if */
    } /* /answer */,

    calling(data) {
      if (data) {
        this.call = data;
      } else {
        this.call = null;
      }
    } /* /calling */,

    connectPeerjs() {
      this.$store.dispatch("peerJs")
      setTimeout(() => {
        this.$store.getters.peerJs.on("open", (id) => {
          this.$store.state.myPeerId = id;
        }); /* end of open */
      }, 300)
    } /* /connectPeerjs */,

    _trans(x) {
      return this.l_[x];
    } /* _trans */,

    darkMode() {
      var swtch = document.getElementById("switch");
      swtch.addEventListener("change", function () {
        const root = document.documentElement;
        if (cookie.get("mode") == "light") {

          //this dark mode
          cookie.set("mode", "light", "360d");
          swtch.setAttribute("checked", "checked");
          root.style.setProperty("--bg", "#111B21");
          root.style.setProperty("--bgbar", "#222E35");
          root.style.setProperty("--bgSearch", "#1D2A31");
          root.style.setProperty("--bgw", "#222E35");
          root.style.setProperty("--fntClr", "#FFFFFF");
          root.style.setProperty("--cShadow", "#1c1b1b");
          root.style.setProperty("--cMsg", "#2A3C46");
          root.style.setProperty("--brdList", "#464646");
          root.style.setProperty("--navMsgC", "#2A3C46");
          root.style.setProperty("--backdateWpperChat", "#48545B");
          root.style.setProperty("--brd", "#1C2B34");
          root.style.setProperty("--scrollColor", "#1C2B34");
          root.style.setProperty("--greenLine", "#19A15F");
          root.style.setProperty("--colorCycle", "#2A3C46");
          root.style.setProperty("--backGroundPhoneObject", "#2A3C46");
          root.style.setProperty("--cmessageShadow", "#242424");
          root.style.setProperty("--notifictionMsg", "#4f6570");
          root.style.setProperty("--myReplayBgColor", "#1a181869");
          root.style.setProperty("--fntReplyMsg", "#a3989869");
          root.style.setProperty("--youBeplayBgColor", "#000");
          cookie.set("mode", "dark");
        } else {

          //this light mode
          swtch.removeAttribute("checked");
          root.style.setProperty("--bgw", "#F8F8F8");
          root.style.setProperty("--bg", "#fff");
          root.style.setProperty("--bgbar", "#F6F6F6");
          root.style.setProperty("--bgSearch", "#F6F6F6");
          root.style.setProperty("--fntClr", "#221D2E");
          root.style.setProperty("--cShadow", "#a9a1a1");
          root.style.setProperty("--cMsg", "#DCF9ED");
          root.style.setProperty("--brdList", "#e3e3e3");
          cookie.set("mode", "light", "360d");
          root.style.setProperty("--navMsgC", "#FFFFFF");
          root.style.setProperty("--backdateWpperChat", "#fff");
          root.style.setProperty("--scrollColor", "#EBEBEB");
          root.style.setProperty("--brd", "#D8D8D8");
          root.style.setProperty("--greenLine", "#19A15F");
          root.style.setProperty("--colorCycle", "#E1E9EB");
          root.style.setProperty("--backGroundPhoneObject", "#F6F6F6");
          root.style.setProperty("--cmessageShadow", "#cccccc");
          root.style.setProperty("--notifictionMsg", "#76a18f");
          root.style.setProperty("--myReplayBgColor", "#d9ece4");
          root.style.setProperty("--fntReplyMsg", "#00000069");
          root.style.setProperty("--youBeplayBgColor", "#f4f4f4");
        } /* end of if */
      }); /* end of addEventListener */
    } /* /listItemProfile */,

    checkMode() {
      cookie.remove("sndRcvId");
      var swtch = document.getElementById("switch");
      const root = document.documentElement;

      if (!cookie.get("mode")) {
        cookie.set("mode", "light", "360d");
      } /* end of if */

      //light mode 
      if (cookie.get("mode") == "light") {
        swtch.removeAttribute("checked");
        root.style.setProperty("--bgw", "#F8F8F8");
        root.style.setProperty("--bg", "#fff");
        root.style.setProperty("--bgbar", "#F6F6F6");
        root.style.setProperty("--bgSearch", "#F6F6F6");
        root.style.setProperty("--fntClr", "#221D2E");
        root.style.setProperty("--cShadow", "#a9a1a1");
        root.style.setProperty("--cMsg", "#DCF9ED");
        root.style.setProperty("--brdList", "#e3e3e3");
        root.style.setProperty("--navMsgC", "#FFFFFF");
        root.style.setProperty("--backdateWpperChat", "#fff");
        root.style.setProperty("--brd", "#1C2B34");
        root.style.setProperty("--brd", "#D8D8D8");
        root.style.setProperty("--scrollColor", "#EBEBEB");
        root.style.setProperty("--greenLine", "#19A15F");
        root.style.setProperty("--colorCycle", "#E1E9EB");
        root.style.setProperty("--backGroundPhoneObject", "#F6F6F6");
        root.style.setProperty("--cmessageShadow", "#cccccc");
        root.style.setProperty("--notifictionMsg", "#76a18f");
        root.style.setProperty("--myReplayBgColor", "#d9ece4");
        root.style.setProperty("--fntReplyMsg", "#00000069");
        root.style.setProperty("--youBeplayBgColor", "#f4f4f4");
      } else {
        //dark mode
        swtch.setAttribute("checked", "checked");
        root.style.setProperty("--bg", "#111B21");
        root.style.setProperty("--bgbar", "#222E35");
        root.style.setProperty("--bgSearch", "#1D2A31");
        root.style.setProperty("--bgw", "#222E35");
        root.style.setProperty("--fntClr", "#FFFFFF");
        root.style.setProperty("--cShadow", "#1c1b1b");
        root.style.setProperty("--cMsg", "#2A3C46");
        root.style.setProperty("--brdList", "#464646");
        root.style.setProperty("--navMsgC", "#2A3C46");
        root.style.setProperty("--backdateWpperChat", "#48545B");
        root.style.setProperty("--brd", "#1C2B34");
        root.style.setProperty("--scrollColor", "#1C2B34")
        root.style.setProperty("--greenLine", "#19A15F");
        root.style.setProperty("--colorCycle", "#2A3C46");
        root.style.setProperty("--backGroundPhoneObject", "#2A3C46");
        root.style.setProperty("--cmessageShadow", "#242424");
        root.style.setProperty("--notifictionMsg", "#4f6570");
        root.style.setProperty("--myReplayBgColor", "#1a181869");
        root.style.setProperty("--fntReplyMsg", "#a3989869");
        root.style.setProperty("--youBeplayBgColor", "#000");
      } /* end of if */
    } /* /checkMode */,

    contactsOptionsM(x, item, close, checkArchive) {
      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var rightSidebar = document.getElementsByClassName("rightSidebar")[0];
      var screenSize = document.body;
      var hchatRoom = document.getElementsByClassName("chat-room")[0];

      if (checkArchive) {
        this.dataForContactProfile.checkArchive = checkArchive;
      } else {
        this.dataForContactProfile.checkArchive = false;
      } /* end of if */

      this.settingYourProfile = false;
      var focusBtn = document.getElementsByClassName("focusBtn")[x];
      var focusBtnNotX = document.getElementsByClassName("focusBtn");
      if (!close) {
        if (focusBtn.dataset.check == "0") {
          focusBtn.dataset.check = "1";
          this.dataForContactProfile.item = item;
          this.contactsOptionsMenu = true;
          focusBtn.style.transform =
            "rotate(" + focusBtn.dataset.rotateArow + "deg)";
          focusBtn.dataset.rotateArow = 0;

          for (var i = 0; i < focusBtnNotX.length; i++) {
            if (
              focusBtnNotX[i].dataset.check == "1" &&
              focusBtnNotX[i] != focusBtn
            ) {
              focusBtnNotX[i].dataset.check = "0";
              focusBtnNotX[i].dataset.rotateArow = 180;
              focusBtnNotX[i].style.transform = "rotate(0deg)";
            } /* end of if */
          } /* end of for loop */
        } else {
          focusBtn.dataset.check = "0";
          this.contactsOptionsMenu = false;
          this.dataForContactProfile.id = {};
          focusBtn.style.transform =
            "rotate(" + focusBtn.dataset.rotateArow + "deg)";
          focusBtn.dataset.rotateArow = 180;
        } /* end of if */

        if (screenSize.offsetWidth < 576) {
          if (leftSideBar && rightSidebar) {
            rightSidebar.style.zIndex = "auto";
            hchatRoom.style.visibility = "hidden";
          } /* end of if  */
        } /* end of if */
      } else {
        for (var j = 0; j < focusBtnNotX.length; j++) {
          focusBtnNotX[j].dataset.check = "0";
          focusBtnNotX[j].dataset.rotateArow = 180;
          focusBtnNotX[j].style.transform = "rotate(0deg)";
        } /* end of for loop */
        this.contactsOptionsMenu = false;

        if (screenSize.offsetWidth < 576) {
          if (leftSideBar && rightSidebar) {
            rightSidebar.style.zIndex = 0;
            hchatRoom.style.visibility = "visible";
          } /* end of if  */
        } /* end of if */
      } /* end of if */
    } /* /contactsOptionsMenu */,

    seetingProfile() {
      var focusBtnNotX = document.getElementsByClassName("focusBtn");
      for (var i = 0; i < focusBtnNotX.length; i++) {
        focusBtnNotX[i].dataset.check = "0";
        focusBtnNotX[i].dataset.rotateArow = 180;
        focusBtnNotX[i].style.transform = "rotate(0deg)";
      } /* end of for loop */

      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var rightSidebar = document.getElementsByClassName("rightSidebar")[0];
      var screenSize = document.body;
      var hchatRoom = document.getElementsByClassName("chat-room")[0];

      this.contactsOptionsMenu = false;
      if (this.settingYourProfile == false) {
        this.settingYourProfile = true;

        if (screenSize.offsetWidth < 576) {
          if (leftSideBar && rightSidebar) {
            rightSidebar.style.zIndex = "auto";
            hchatRoom.style.visibility = "hidden";
          } /* end of if  */
        } /* end of if */
      } else {
        this.settingYourProfile = false;

        if (screenSize.offsetWidth < 576) {
          if (leftSideBar && rightSidebar) {
            rightSidebar.style.zIndex = 0;
            hchatRoom.style.visibility = "visible";
          } /* end of if  */
        }
      } /* end of if */
    } /* /seetingProfile */,

    closeListSetting(check) {
      if (check == true) {
        this.settingYourProfile = false;
        var hchatRoom = document.getElementsByClassName("chat-room")[0];
        var rightSidebar = document.getElementsByClassName("rightSidebar")[0];
        hchatRoom.style.visibility = "visible";
        rightSidebar.style.zIndex = 0;
      } /* end of if */
    } /* /closeListSetting */,

    myChat() {
      const user = cookie.get("user");
      var payload = { user_id: user.id };
      this.$store.dispatch("myContact", payload);
    } /* /myContact */,

    myProfile(x) {
      if (x) {
        if (x.profile_image) {
          const myImg = document.getElementById("myImg");
          myImg.src = this.$store.state.imgProfilePath + x.profile_image;
        } /* /end of if */
      } else {
        if (cookie.get("user")) {
          if (cookie.get("user").profile_image) {
            const myImg = document.getElementById("myImg");
            myImg.src =
              this.$store.state.imgProfilePath +
              cookie.get("user").profile_image;
          } /* /end of if */
        } /* end of if */
      } /* end of if */
    } /* /myProfile */,

    getMessageByUser(reciver, sender, chat_id, item) {

      console.log("loader for workin ...")
      const memologo = document.getElementsByClassName("memologo")[0];
      memologo.style.display = "none";
      const chatRoom = document.getElementsByClassName("chatRoom")[0];
      chatRoom.style.zIndex = "3";

      var wepperChat = document.getElementsByClassName("wepper-chat")[0]
      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var rightSidebar = document.getElementsByClassName("rightSidebar")[0];
      var screenSize = document.body;

      if (wepperChat) {
        wepperChat.innerHTML = ""
        var loader = document.createElement("div")
        loader.classList.add("loader")
        wepperChat.appendChild(loader)
        wepperChat.style.alignItems = "center"
        wepperChat.style.justifyContent = "center"
        wepperChat.style.display = "flex"
        document.getElementsByClassName("stateUser")[0].innerHTML = ""
        document.getElementsByClassName("fullScreen")[0].style.visibility = "hidden"
        document.getElementsByClassName("fullScreen")[0].style.zIndex = "-1"

      }/* /wepperChat */


      this.reciverUser = item;
      if (chat_id) {
        var payload = {
          sender_id: sender,
          reciver_id: reciver,
          chat_id: chat_id,
        };
        this.$store.dispatch("getMessageByUser", payload);
      } else {
        cookie.remove("sndRcvId");
        cookie.set("sndRcvId", {
          sender_id: sender,
          reciver_id: reciver,
          chat_id: null,
        });
        this.$store.state.getMessageByUser = [];
      } /* end of if */

      if (screenSize.offsetWidth < 576) {
        if (leftSideBar && rightSidebar) {
          rightSidebar.style.zIndex = 1;
          leftSideBar.style.zIndex = 0;
        } /* end of if  */
      }
    } /* /getMessageByUser */,

    checkLang() {
      var langs = this.$store.state.lang || "";
      var serachBar = document.getElementsByClassName("serachBar")[0];
      var closeProfiles = document.getElementsByClassName("closeProfiles")[0]
      var buttonSearchMessage = document.getElementsByClassName("buttonSearchMessage")[0]
      var deleteArrow = document.getElementsByClassName("deleteArrow")[0]
      var arrowDown = document.getElementsByClassName("arrow-down")[0]
      var searchInputMsg = document.getElementsByClassName("searchInputMsg")[0]
      var settingChat = document.getElementsByClassName("settingChat")[0]
      var replayedMessage=document.getElementsByClassName("replayedMessage")


      if (langs == "ar") {
        document.body.style.direction = "rtl";
        serachBar.children[0].style.left = "8%";
        serachBar.children[0].style.right = "";
        serachBar.children[1].style.padding = "0px 10px 0px 40px";
        closeProfiles.style.transform = "rotate(180deg)"
        buttonSearchMessage.style.left = "0px"
        buttonSearchMessage.style.right = "unset"

        deleteArrow.style.right = "unset"
        deleteArrow.style.left = "0px"
        arrowDown.style.transform = "rotate(90deg) translateY(10px)"

        searchInputMsg.style.transform = "translateX(10px)"
        settingChat.style.left = "8px"

        // for(var i=0;i<replayedMessage.length;i++){
        //   replayedMessage[i].style.
        // }/* end of for loop */

      } else if (langs == "en") {
        serachBar.children[0].style.left = "";
        serachBar.children[0].style.right = "8%";
        serachBar.children[1].style.padding = "0px 40px 0px 10px";
        document.body.style.direction = "ltr";
        closeProfiles.style.transform = "rotate(0deg)";
        buttonSearchMessage.style.left = "unset"
        buttonSearchMessage.style.right = "0px"

        deleteArrow.style.right = "0px"
        deleteArrow.style.left = "unset"
        arrowDown.style.transform = "rotate(-90deg) translateY(10px)"

        searchInputMsg.style.transform = "translateX(-10px)"
        settingChat.style.left = "-195px"

        //for(var j=0;j<replayedMessage.length;j++){}/* end of for loop */

      } /* end of if  */
    } /* /checkLang */,

    yourStatus() {
      var st = document.getElementById("yourStatus");
      if (st.length > 60)
        st.textContent = st.textContent.substring(0, 60) + " ...";
    } /* /yourStatus */,

    newProfileImage() {
      var newProfileImage = document.getElementById("newProfileImage");
      newProfileImage.addEventListener("change", (e) => {
        const extn =
          "." +
          e.target.files[0].name.split(".")[
          e.target.files[0].name.split(".").length - 1
          ];
        if (
          //is validate on image file
          extn == ".jpg" ||
          extn == ".jpeg" ||
          extn == ".gif" ||
          extn == ".png" ||
          extn == ".tiff" ||
          extn == ".raw"
        ) {
          this.fileImg = e.target.files[0];
          const reader = new FileReader();
          reader.addEventListener("load", async () => {
            var blah = document.getElementById("desplayProfileImage");
            const uploaded_img = reader.result;
            blah.src = uploaded_img;

            const ex = new FormData();
            ex.append("id", cookie.get("user").id);
            ex.append("img_profile", this.fileImg);
            //here i will upload iamge to the server and uplaod on iamge in cookie
            var resulte = await axios.post(
              this.$store.state.pattUrl +
              this.$store.state.port +
              "upadteImageProfile",
              ex
            );
            if (resulte) {
              cookie.remove("user");
              cookie.set("user", resulte.data[0]);
              this.myProfile(resulte.data[0]);
            } /* end of if */
          }); /* end of reader listener */
          reader.readAsDataURL(newProfileImage.files[0]);
        } else {
          console.log("this type not supported");
        } /* end of if */
      }); /* /newProfileImage.addEventListener */
    } /* /newProfileImage */,

    deleteConversation() {
      this.io.on("deleteConversation", (data) => {
        var myContact = document.getElementById(data.chat_id);
        if (!myContact) {
          myContact = document.querySelector("[chat_id=" + null + "]");
        }
        // for (var i = 0; i < myContact.children.length; i++) {
        //   if (myContact.children[i].classList.contains("router-link-active")) {
        //     //you must delete every child here
        //     for (var j = 0; j < myContact.children[i].length; j++) {
        //       if (
        //         myContact.children[i].children[j].contains("imgContactProfile")
        //       ) {
        //         myContact.children[i].children[
        //           j
        //         ].children[0].children[0].remove();
        //         myContact.children[i].children[j].children[0].remove();
        //         myContact.children[i].children[j].remove();
        //       } else if (
        //         myContact.children[i].children[j].contains("user-lastMsg")
        //       ) {
        //         myContact.children[i].children[j].children[0].remove();
        //         myContact.children[i].children[j].children[1].remove();
        //       } /* end of if */
        //     } /* end of for loop */
        //     myContact.children[i].remove();
        //   } else if (
        //     myContact.children[i].classList.contains("dateAndOptions")
        //   ) {
        //     for (var k = 0; k < myContact.children[i].children.length; k++) {
        //       if (
        //         !myContact.children[i].children[k].classList.contains("aroow")
        //       ) {
        //         myContact.children[i].children[k].remove();
        //       } else if (
        //         myContact.children[i].children[k].classList.contains("aroow")
        //       ) {
        //         myContact.children[i].children[
        //           k
        //         ].children[0].children[0].remove();
        //         myContact.children[i].children[k].children[0].remove();
        //         myContact.children[i].children[k].remove;
        //       } /* end of if */
        //     } /* end of for loop */
        //     myContact.children[i].remove();
        //   } /* end of of */
        // } /* end of for loop */
        myContact.style.display = "none";
        if (cookie.get("sndRcvId"))
          if (cookie.get("sndRcvId").chat_id == data.chat_id) {
            var wepperChat = document.querySelector(
              "div[chat_id='" + data.chat_id + "']"
            );

            wepperChat.innerHTML = "";
            wepperChat.removeAttribute("chat_id");

            const memologo = document.getElementsByClassName("memologo")[0];
            memologo.style.display = "inherit";
            const chatRoom = document.getElementsByClassName("chatRoom")[0];
            chatRoom.style.zIndex = "-1";
            cookie.remove("sndRcvId");
          } /* end of if  */
      }); /* /deleteConversation emit */
    } /* /deleteConversation */,

    // checkUsersConnection() {
    //   setTimeout(() => {
    //     if (!this.serachUser || this.serachUser == "") {
    //       //const myId=this.user.id
    //       this.$store.state.myChat.forEach((el) => {
    //         console.log(el);
    //       }); /* end of for each */
    //     } /* end of if */
    //   }, 600);
    // } /* /checkUsersConnection */,

    //this function to check the size of screen if less than 500px ,in this time i will dispaly screen such mobile screen
    resizePage() {
      var screenSize = document.body;
      var sidebar = document.getElementsByClassName("sidebar")[0];
      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var rightSidebar = document.getElementsByClassName("rightSidebar")[0];

      if (screenSize.offsetWidth < 576) {
        if (leftSideBar && rightSidebar) {
          if (cookie.get("sndRcvId")) {
            rightSidebar.style.zIndex = 1;
            leftSideBar.style.zIndex = 0;
          } else {
            rightSidebar.style.zIndex = 0;
            leftSideBar.style.zIndex = 3;
          }
        } /* end of if  */
      } else {
        sidebar.style.display = "grid";
        sidebar.style.position = "static";
        rightSidebar.style.position = "relative";
        leftSideBar.style.position = "relative";
      } /* end of if  */

      window.addEventListener("resize", () => {
        if (screenSize.offsetWidth < 576) {
          if (leftSideBar && rightSidebar) {
            if (cookie.get("sndRcvId")) {
              rightSidebar.style.zIndex = 1;
              leftSideBar.style.zIndex = 0;
            } else {
              rightSidebar.style.zIndex = 0;
              leftSideBar.style.zIndex = 3;
            } /* end of if */
          } /* end of if  */
        } /* end of if */

        // if (screenSize.offsetWidth > 720 || screenSize.offsetWidth < 720) {
        //   sidebar.style.display = "grid";
        //   sidebar.style.position = "static";
        //   rightSidebar.style.position = "relative";
        //   leftSideBar.style.position = "relative";
        // } /* end of if */
      }); /* /end of addEvENTlISTENER */
    } /* /resizePage */,
  } /* end of methods */,
}; /* end of export default */
</script>

<style lang="scss" scoped>
#switch {
  width: 0;
  height: 0;
  visibility: hidden;
  position: absolute;
}

#labForSwitch {
  background-color: #c5cfd1;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
}

#labForSwitch::after {
  content: "";
  width: 14px;
  height: 14px;
  background-color: #e8f5f7;
  position: absolute;
  border-radius: 70px;
  top: 2.5px;
  left: 5px;
  transition: 0.5s;
}

#switch:checked+#labForSwitch:after {
  left: calc(100% - 10px);
  transform: translateX(-100%);
}

#switch:checked+#labForSwitch {
  background-color: #243d42;
}
</style>