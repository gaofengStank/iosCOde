//
//  ViewController.m
//  ProjectFirst
//
//  Created by kenny on 16/1/7.
//  Copyright (c) 2016年 APICloud. All rights reserved.
//

#import "ViewController.h"
#import "APIWindowContainer.h"
#import "APIManager.h"
#import "APIEvent.h"
#import "APIWebView.h"
#import "APIScriptMessage.h"
#import "APIModuleMethod.h"
#import "UZAppUtils.h"

@interface ViewController ()
<APIWebViewDelegate, APIModuleMethodDelegate, APIScriptMessageDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"首页";
    self.view.backgroundColor = [UIColor whiteColor];
    
    APIManager *manager = [APIManager sharedManager];
    manager.webViewDelegate = self;
    manager.moduleMethodDelegate = self;
    manager.scriptMessageDelegate = self;
    
    [[APIEventCenter defaultCenter] addEventListener:self selector:@selector(handleEvent:) name:@"abc"];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    [self.navigationController setNavigationBarHidden:NO animated:YES];
    self.navigationController.navigationBar.barTintColor = [UZAppUtils colorFromNSString:@"#078f5f"];
    self.navigationController.navigationBar.translucent = NO;
    self.navigationController.navigationBar.titleTextAttributes = @{NSForegroundColorAttributeName:[UIColor whiteColor]};
}

- (UIStatusBarStyle)preferredStatusBarStyle {
    return UIStatusBarStyleLightContent;
}

#pragma mark - 点击事件
- (IBAction)openSuperWebView:(UIButton *)button {
    button.highlighted = NO;
    
    // 这里的widget://表示widget的根目录路径，加载widget以外地方的页面可以使用绝对路径
    NSString *url = @"widget://index.html";
    NSString *name = @"index";
    APIWindowContainer *windowContainer = [APIWindowContainer windowContainerWithAttribute:@{@"url":url, @"name":name}];
    [windowContainer startLoad];
    [self.navigationController pushViewController:windowContainer animated:YES];
}

#pragma mark - 监听html页面发送的事件
// h5里面使用api.sendEvent方法发送事件
- (void)handleEvent:(APIEvent *)event {
    NSString *msg = [NSString stringWithFormat:@"收到来自Html5的%@事件，传入的参数为:%@", event.name, event.userInfo];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"" message:msg delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
    [alert show];
}

#pragma mark - APIWebViewDelegate
- (BOOL)webView:(APIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(NSInteger)navigationType {
    NSString *url = request.URL.absoluteString;
    if ([url hasPrefix:@"http://www.taobao.com"]) {
        NSString *msg = @"不允许访问淘宝";
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"" message:msg delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
        [alert show];
        return NO;
    } else if ([url hasPrefix:@"http://www.baidu.com"]) {
        return YES;
    }
    return YES;
}

#pragma mark - APIScriptMessageDelegate
// 在h5页面调用api.accessNative方法后会触发代理方法
- (void)webView:(APIWebView *)webView didReceiveScriptMessage:(APIScriptMessage *)scriptMessage {
    if ([scriptMessage.name isEqual:@"abc"]) {
        NSString *msg = [NSString stringWithFormat:@"收到来自Html5的操作请求，访问的名称标识为%@，传入的参数为:%@", scriptMessage.name, scriptMessage.userInfo];
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"" message:msg delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
        [alert show];
        
        [scriptMessage callbackWithRet:@{@"result":@"value"} err:nil delete:YES];
    } else if ([scriptMessage.name isEqual:@"requestEvent"]) {
        [[APIEventCenter defaultCenter] sendEventWithName:@"fromNative" userInfo:@{@"value":@"我是来自Native的事件"}];
    }
}

#pragma mark - APIModuleMethodDelegate
- (BOOL)shouldInvokeModuleMethod:(APIModuleMethod *)moduleMethod {
    if ([moduleMethod.module isEqualToString:@"api"] && [moduleMethod.method isEqualToString:@"sms"]) {
        return NO;
    }
    return YES;
}

@end
