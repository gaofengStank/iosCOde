//
//  APITabLayoutContainer.h
//  UZEngine
//
//  Created by kenny on 2019/3/27.
//  Copyright © 2019 APICloud. All rights reserved.
//

#import "APIWindowContainer.h"

@interface APITabLayoutContainer : APIWindowContainer

/*!
 通过指定页面参数来创建一个tabLayout容器
 @param attribute 页面参数信息，里面的key可以参考openTabLayout方法的参数：http://docs.apicloud.com/Client-API/api#openTabLayout
 @param widget 使用指定的widget，传nil时表示使用应用bundle下面的widget
 @return 继承于UIViewController的tabLayout容器对象
 */
+ (instancetype)tabLayoutContainerWithAttribute:(NSDictionary *)attribute widget:(UZWidget *)widget;

@end
