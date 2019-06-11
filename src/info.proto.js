package Emarbox.Interface;

message Info {
	// 渠道ID
	required int32 channel_id = 1;
	// 请求ID
	required string request_id = 2;
	// [已废弃]竞价时间 格式：YYYYMMDDHHmmss
	optional string bid_time = 3;
	// 竞价时间戳
	optional int64 bid_timestamp = 31;
	// IP地址，数字类型，网络字节序
	optional uint64 ip = 21;
	// 用户信息
	optional User user = 4;
	// 是否是APP流量
	optional bool is_app = 5 [default = false];
	// APP信息
	optional App app = 6;
	// 创意信息
	required CreativeInfo creative_info = 7;
	// 设备信息
	optional Device device = 8;
	// 浏览器ID
	optional string browser_id = 9 [default = "0000"];
	// 网站信息
	optional Site site = 10;
	// 请求类别 0-pc 1-wap
	optional int32 request_type = 11 [default = 0];
	// 点击ID
	optional string click_id = 12;

	// ext 点击或者曝光的ext信息
	optional string ext = 13;
}

message User {
	// DMP ID
	optional string dmp_id = 1;
	// 渠道用户ID
	optional string channel_user_id = 2;

	enum Gender {
		GENDER_UNKNOWN = 0;
		MALE = 1;
		FEMALE = 2;
	}
	optional Gender gender = 3;
}

message CreativeInfo {
	// 广告主ID
	optional int32 owner_id = 1;
	// 项目ID
	required int32 project_id = 2;
	// 活动ID
	required int32 campaign_id = 3;
	// 创意ID
	required int32 creative_id = 4;
	// 动态创意参数 （暂时未用）
	optional string dynamic_ext = 5;
	// RTB自定义参数1
	optional string rtb_ext1 = 6;
	// RTB自定义参数2
	optional string rtb_ext2 = 7;
	// 竞价方式
	enum BidType {
  	PUBLIC_AUCTION = 0;
  	PRIVATE_AUCTION = 1;
  }
  optional BidType bid_type = 8 [default = PUBLIC_AUCTION];
  // 模板ID
  optional int32 template_id = 19;

  repeated int64 tag_id = 20;	

  // 创意所投放的广告位信息
  message AdslotInfo {
  	// 广告位ID
  	optional string adslot_id = 1;
  	enum SlotVisibility  {
			SCREEN_UNKNOWN  = 0;
			SCREEN_FIRST  = 1;
			SCREEN_SECOND = 2;
			SCREEN_THIRD  = 3;
			SCREEN_FOURTH = 4;
			SCREEN_FIFTH  = 5;
			SCREEN_BEHIND_FIFTH  = 6;
			
			SCREEN_BELOW_THE_FOLD = 10;	//非首屏

			SCREEN_TOP_VISIBLE = 11;
			SCREEN_BOTTOM_VISIBLE = 12;
			SCREEN_TOP_SCROLL_VISIBLE = 13;
			SCREEN_BOTTOM_SCROLL_VISIBLE = 14;
			SCREEN_OTHER_LOCATION = 15;		
		
			SCREEN_HEADER = 24; 
			SCREEN_FOOTER	= 25;
			SCREEN_SIDEBAR = 26;
			SCREEN_FULLSCREEN	= 27;
		}
		optional SlotVisibility slot_visibility = 2 [default = SCREEN_UNKNOWN];
		// 宽
		optional int32 width = 3 [default = 0];
		// 高
		optional int32 height = 4 [default = 0];
  }
  required AdslotInfo adslot = 9;
  
  // pmp deal id
  optional string deal_id = 10;
  // 计费类型 "cpc"或"cpm"
  optional string fee_type = 11 [default = "cpc"];
  // 出价 单位：目前PC和WAP流量的单位是10^-6元/千次展现，APP流量的单位是分/千次展现 TODO
  required int32 bid_price = 12;
  // 真实ctr
  optional float ctr = 13;
  // ectr
  optional float ectr = 14;
  // 用户价值 min(ceilingPrice,adValue) PC流量会将该值扩大1000倍 TODO
  required float ad_price = 15;
  // 用户估值
  optional float ad_value = 16;
  // 活动类型：0-普通 1-PPB 2-托底
  optional int32 campaign_type = 17 [default = 0];
  // 用户类型
	optional string user_type = 18 [default = "9999"];
}

message Device {
	// 设备ID
	optional string device_id = 1;
	// 上报ID信息
	message UploadInfo {
		// 上报ID类型
		enum IdType {
			IMEI = 1;
			IMEI_SHA1 = 2;
			IMEI_MD5 = 3;
			
			MAC = 4;
			MAC_SHA1 = 5;
			MAC_MD5 = 6;
			
			IDFA = 7;
			IDFA_SHA1 = 8;
			IDFA_MD5 = 9;
			
			ANDROID_ID = 10;
			ANDROID_ID_SHA1 = 11;
			ANDROID_ID_MD5 = 12;
			
			ADVERTISING_ID = 13;
		}
		required IdType type = 1;
		// ID
		required string id = 2;
	}
	repeated UploadInfo upload_info = 10;
	// 经纬度
	message Geo {
		// 经度
		optional float longitude = 1;
		// 纬度
		optional float latitude = 2;
	}
	optional Geo geo = 2;
	// 系统类别
	enum PlatformType{
  	UNKNOWN_OS = 0;
  	IOS = 1;
  	ANDROID = 2;
  	WINDOWS = 3;
  }
  optional PlatformType platform = 3 [default = UNKNOWN_OS];
  // 系统版本号
  optional string os_version = 4;
  // 品牌
  optional string brand = 5;
  // 型号
  optional string model = 6;
  // 设备使用的运营商，0:未知 1：中国移动 2：中国联通 3：中国电信 
  enum CarrierType {
  	UNKNOWN_CARRIER = 0;
  	CHINA_MOBILE = 1;
  	CHINA_UNICOM = 2;
  	CHINA_TELECOM = 3;  	
  }
  optional CarrierType carrier_id = 7 [default = UNKNOWN_CARRIER];
  // 无线网络类型
  enum WirelessNetworkType {
    UNKNOWN_NETWORK = 0;
    WIFI = 1;
    MOBILE_2G = 2;
    MOBILE_3G = 3;
    MOBILE_4G = 4;
  }
  optional WirelessNetworkType wireless_network_type = 8 [default = UNKNOWN_NETWORK];
  // 设备类型
  enum MobileDeviceType {
    UNKNOWN_DEVICE = 0;
    HIGHEND_PHONE = 1;
    TABLET = 2;
    TV = 3;
  }
  optional MobileDeviceType mobile_device_type = 9 [default = UNKNOWN_DEVICE];
}

message App {
	// APP ID IOS为该APP在app store中的ID，ANDROID为该APP的包名
	optional string app_id = 1;
	// APP类别
	repeated int32 app_type = 2;
}

message Site {
	// 媒体类别
	repeated string media_type = 1;
	// 媒体域名
	optional string domain = 2;
	// 媒体匿名ID
	optional string anonymous_id = 3;
}