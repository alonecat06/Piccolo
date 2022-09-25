#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

highp vec4 color_grading(highp vec4 color, ivec2 lut_tex_size)
{    
    highp float n = floor(color.b * 16.0f);
    highp vec2 uv = vec2(n + color.r, color.g) * 16.0f / vec2(lut_tex_size);
    highp vec4 x = texture(color_grading_lut_texture_sampler, uv);
    
    n = ceil(color.b * 16.0f);
    uv = vec2(n + color.r, color.g) * 16.0f / vec2(lut_tex_size);
    highp vec4 y = texture(color_grading_lut_texture_sampler, uv);
    
    highp float alpha = n - color.b * 16.0f;
    
    highp vec4 final_color = mix(y, x, alpha);
    final_color.a = color.a;
    
    return final_color;
}

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);

    highp vec4 color         = subpassLoad(in_color).rgba;

    out_color = color_grading(color, lut_tex_size);
}
