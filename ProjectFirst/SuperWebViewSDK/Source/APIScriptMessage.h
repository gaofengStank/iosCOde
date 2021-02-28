//
//  APIScriptMessage.h
//  APICloud
//
//  Created by kenny on 16/1/8.
//  Copyright (c) 2016年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@class APIWebView;

@interface APIScriptMessage : NSObject

/*! 消息名称，对应调用api.accessNative时的name参数 */
@property (nonatomic, copy, readonly) NSString *name;

/*! 消息的附加信息，对应调用api.accessNative时的extra参数 */
@property (nonatomic, copy, readonly) id userInfo;

@property (nonatomic,readonly) NSInteger callback __attribute__((deprecated("使用callbackWithRet:err:方法回调数据")));

- (void)callbackWithRet:(id)ret err:(id)err delete:(BOOL)del;

@end


/*! html页面和原生交换数据协议，需要根据webView来区分具体是哪个页面 */
@protocol APIScriptMessageDelegate <NSObject>

/*!
 接收到html里面通过api.accessNative方法发送的消息
 @param webView 所在的页面
 @param scriptMessage 接收到的消息对象
 */
- (void)webView:(APIWebView *)webView didReceiveScriptMessage:(APIScriptMessage *)scriptMessage;

@end
