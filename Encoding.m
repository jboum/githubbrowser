#include "Encoding.h"
#include "RCTRootView.h"

@implementation Encoding

RCT_EXPORT_MODULE(); //makes the code available to js

RCT_EXPORT_METHOD(base64Encode : (NSString*) str callback: (RCTResponseSenderBlock)callback) //name of the method as to be seen in js code and the params
{
    //nsdata holds the result of calling dataUsingEncoding method with params NSUTF8StringEncoding on str
    NSData *nsdata = [str dataUsingEncoding:NSUTF8StringEncoding]; 
    NSString *base64Encoded = [nsdata base64EncodedStringWithOptions:0]; //instantiate a string after calling method base64EncodedStringWithOptions on nsdata with params 0

    callback(@[base64Encoded]);
}
@end