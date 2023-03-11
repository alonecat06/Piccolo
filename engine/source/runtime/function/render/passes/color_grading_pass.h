#pragma once

#include "runtime/function/render/render_pass.h"

namespace Piccolo
{
    struct ColorGradingPassInitInfo : RenderPassInitInfo
    {
        RHIRenderPass* render_pass;
        RHIImageView* input_attachment;
    };

    class ColorGradingPass : public RenderPass
    {
    public:
        void initialize(const RenderPassInitInfo* init_info) override final;
        void draw() override final;
        void refreshShader(std::shared_ptr<RHI> m_rhi) override final;

        void updateAfterFramebufferRecreate(RHIImageView* input_attachment);
        
    private:
        void setupDescriptorSetLayout();
        void setupPipelines();
        void setupDescriptorSet();
        void resetPipelines(std::vector<unsigned char> vert_shader, std::vector<unsigned char> frag_shader);
    };
} // namespace Piccolo
