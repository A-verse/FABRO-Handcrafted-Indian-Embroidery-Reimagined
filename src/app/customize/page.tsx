'use client';

import { useState } from 'react';
import Image from 'next/image';

type FormStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface CustomizationData {
  logisticsOption: 'parcel-own' | 'fabro-sources' | '';
  clothingType: string;
  fabric: string;
  embroideryStyle: string;
  placement: string;
  colorPalette: string;
  designImage: string;
  clothingImage: string;
  notes: string;
}

export default function CustomizePage() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<CustomizationData>({
    logisticsOption: '',
    clothingType: '',
    fabric: '',
    embroideryStyle: '',
    placement: '',
    colorPalette: '',
    designImage: '',
    clothingImage: '',
    notes: '',
  });

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((currentStep + 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

const handleSubmit = () => {
    const message = `🎨 CUSTOM EMBROIDERY REQUEST%0A%0A` +
      `📦 Logistics: ${formData.logisticsOption === 'parcel-own' ? 'I will parcel my clothing' : 'FABRO sources base clothing'}%0A` +
      `👕 Clothing: ${formData.clothingType}%0A` +
      `🧵 Fabric: ${formData.fabric || 'As selected'}%0A` +
      `✨ Style: ${formData.embroideryStyle}%0A` +
      `📍 Placement: ${formData.placement}%0A` +
      `🎨 Colors: ${formData.colorPalette}%0A%0A` +
      `📝 Notes: ${formData.notes || 'None'}%0A%0A` +
      `Design reference image: ${formData.designImage ? 'Yes, will share' : 'Will share later'}`;
    
    window.open(`https://wa.me/8852808522?text=${message}`, '_blank');
  };

  const updateFormData = (field: keyof CustomizationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (field: 'designImage' | 'clothingImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = [
    { number: 1, title: 'Logistics', icon: '📦' },
    { number: 2, title: 'Clothing Type', icon: '👕' },
    { number: 3, title: 'Choose Fabric', icon: '✨' },
    { number: 4, title: 'Design Style', icon: '🎨' },
    { number: 5, title: 'Placement', icon: '📍' },
    { number: 6, title: 'Upload Designs', icon: '📸' },
    { number: 7, title: 'Final Details', icon: '✓' },
  ];

  const clothingTypes = [
    { id: 'kurti', label: 'Kurti', desc: 'Traditional Indian tunic' },
    { id: 'shirt', label: 'Shirt', desc: 'Casual or formal' },
    { id: 'dupatta', label: 'Dupatta', desc: 'Scarf or shawl' },
    { id: 'jeans', label: 'Jeans', desc: 'Denim embroidery' },
    { id: 'dress', label: 'Dress', desc: 'Western or fusion' },
    { id: 'jacket', label: 'Jacket', desc: 'Outerwear piece' },
  ];

  const fabricOptions = [
    { id: 'silk', label: 'Pure Silk', desc: 'Luxurious and flowing' },
    { id: 'linen', label: 'Premium Linen', desc: 'Breathable elegance' },
    { id: 'cotton', label: 'Fine Cotton', desc: 'Comfort and durability' },
    { id: 'blend', label: 'Silk Blend', desc: 'Best of both worlds' },
    { id: 'existing', label: 'Use My Fabric', desc: 'I\'m sending my own' },
  ];

  const styleOptions = [
    { id: 'traditional', label: 'Traditional', desc: 'Classic Indian motifs' },
    { id: 'contemporary', label: 'Contemporary', desc: 'Modern interpretations' },
    { id: 'minimal', label: 'Minimal', desc: 'Subtle and elegant' },
    { id: 'bold', label: 'Bold Statement', desc: 'Eye-catching designs' },
  ];

  const placementOptions = [
    { id: 'neckline', label: 'Neckline', desc: 'Around collar area' },
    { id: 'sleeves', label: 'Sleeves', desc: 'Arm embroidery' },
    { id: 'back', label: 'Back Panel', desc: 'Full back design' },
    { id: 'border', label: 'Border/Hem', desc: 'Along edges' },
    { id: 'allover', label: 'All-Over', desc: 'Complete coverage' },
    { id: 'custom', label: 'Custom Placement', desc: 'I\'ll specify' },
  ];

  const colorPalettes = [
    { id: 'maroon', label: 'Maroon Dreams', colors: ['#5D2C2C', '#722C2C', '#8B4141'] },
    { id: 'gold', label: 'Golden Hour', colors: ['#C9A961', '#E8DCC8', '#F5E6D3'] },
    { id: 'pastels', label: 'Soft Pastels', colors: ['#D4A5A5', '#C9B4D4', '#A5D4C4'] },
    { id: 'jewel', label: 'Jewel Tones', colors: ['#5D2C2C', '#1C5D5D', '#8B4141'] },
    { id: 'custom', label: 'Custom Colors', colors: ['#000', '#666', '#CCC'] },
  ];

  // Calculate progress percentage
  const completedSteps = currentStep - 1;
  const progressPercentage = (completedSteps / (steps.length - 1)) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-ivory to-ivory/50 pt-20">
      {/* Hero Header */}
      <section className="section-spacing-lg bg-gradient-to-b from-ivory to-ivory/30 border-b border-ivory/40">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-slide-down">
            <p className="label-text mb-4">CREATE YOUR MASTERPIECE</p>
            <h1 className="heading-display-md mb-4">Commission Your Custom Design</h1>
            <p className="body-lg text-charcoal/70 italic">
              Your fabric, our thread, one story.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-5xl mx-auto mb-8">
            {/* Progress Percentage */}
            <div className="mb-4">
              <div className="h-2 bg-ivory rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-wine-red to-maroon transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between items-center">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center flex-1 relative">
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-2xl font-serif font-bold transition-all mb-2 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-br from-wine-red to-maroon text-ivory shadow-lg scale-110'
                        : 'bg-white border-2 border-ivory text-charcoal/40 shadow-sm'
                    }`}
                  >
                    {step.icon}
                  </div>
                  
                  {/* Label */}
                  <p className={`text-xs md:text-sm text-center font-medium hidden md:block ${
                    currentStep >= step.number ? 'text-charcoal' : 'text-charcoal/40'
                  }`}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step Counter */}
          <div className="text-center">
            <p className="text-sm text-charcoal/60">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="section-spacing-lg">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            
            {/* Step 1: Logistics Option */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="heading-lg mb-4 text-center">How would you like to proceed?</h2>
                <p className="body-base text-charcoal/70 mb-10 text-center max-w-2xl mx-auto">
                  Choose whether you'd like to send us your own clothing item or have FABRO source the base garment for you.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => updateFormData('logisticsOption', 'parcel-own')}
                    className={`p-8 border-2 rounded-lg text-left transition-all shadow-card hover:shadow-lg ${
                      formData.logisticsOption === 'parcel-own'
                        ? 'border-wine-red bg-wine-red/5'
                        : 'border-ivory hover:border-wine-red/30 bg-white'
                    }`}
                  >
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="heading-md text-charcoal mb-3">I'll Parcel My Clothing</h3>
                    <p className="body-sm text-charcoal/70 mb-4">
                      Send us your own clothing item (purchased or existing) and we'll add beautiful embroidery to it.
                    </p>
                    <ul className="space-y-2 text-sm text-charcoal/60">
                      <li>✓ Use your favorite fabric</li>
                      <li>✓ Transform existing pieces</li>
                      <li>✓ We'll provide shipping instructions</li>
                    </ul>
                  </button>

                  <button
                    onClick={() => updateFormData('logisticsOption', 'fabro-sources')}
                    className={`p-8 border-2 rounded-lg text-left transition-all shadow-card hover:shadow-lg ${
                      formData.logisticsOption === 'fabro-sources'
                        ? 'border-wine-red bg-wine-red/5'
                        : 'border-ivory hover:border-wine-red/30 bg-white'
                    }`}
                  >
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="heading-md text-charcoal mb-3">FABRO Sources for Me</h3>
                    <p className="body-sm text-charcoal/70 mb-4">
                      We'll source premium base clothing matching your preferences and add custom embroidery.
                    </p>
                    <ul className="space-y-2 text-sm text-charcoal/60">
                      <li>✓ Curated fabric selection</li>
                      <li>✓ Perfect fit guarantee</li>
                      <li>✓ Hassle-free process</li>
                    </ul>
                  </button>
                </div>

                {formData.logisticsOption === 'parcel-own' && (
                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-bold text-charcoal mb-3">📋 Parceling Instructions:</h4>
                    <ol className="space-y-2 text-sm text-charcoal/80">
                      <li>1. Complete this customization form</li>
                      <li>2. We'll share our workshop address via WhatsApp</li>
                      <li>3. Securely pack and courier your item to us</li>
                      <li>4. We'll confirm receipt and start crafting</li>
                      <li>5. Your customized piece ships back free!</li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Clothing Type */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="heading-lg mb-4 text-center">What type of clothing?</h2>
                <p className="body-base text-charcoal/70 mb-10 text-center">
                  Select the garment type you'd like us to embroider.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clothingTypes.map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('clothingType', option.id)}
                      className={`p-6 border-2 rounded-lg text-left transition-all shadow-card hover:shadow-lg ${
                        formData.clothingType === option.id
                          ? 'border-wine-red bg-wine-red/5'
                          : 'border-ivory hover:border-wine-red/30 bg-white'
                      }`}
                    >
                      <h3 className="heading-sm text-charcoal mb-2">{option.label}</h3>
                      <p className="body-sm text-charcoal/60">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Fabric Selection */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="heading-lg mb-4 text-center">Choose Your Fabric</h2>
                <p className="body-base text-charcoal/70 mb-10 text-center">
                  {formData.logisticsOption === 'parcel-own' 
                    ? 'What fabric is your clothing made of?' 
                    : 'Select the fabric for your base garment.'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fabricOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('fabric', option.id)}
                      className={`p-6 border-2 rounded-lg text-left transition-all shadow-card hover:shadow-lg ${
                        formData.fabric === option.id
                          ? 'border-wine-red bg-wine-red/5'
                          : 'border-ivory hover:border-wine-red/30 bg-white'
                      }`}
                    >
                      <h3 className="heading-sm text-charcoal mb-2">{option.label}</h3>
                      <p className="body-sm text-charcoal/60">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Embroidery Style */}
            {currentStep === 4 && (
              <div className="animate-fade-in">
                <h2 className="heading-lg mb-4 text-center">Choose Embroidery Style</h2>
                <p className="body-base text-charcoal/70 mb-10 text-center">
                  Select the aesthetic that speaks to you.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {styleOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('embroideryStyle', option.id)}
                      className={`p-6 border-2 rounded-lg text-left transition-all shadow-card hover:shadow-lg ${
                        formData.embroideryStyle === option.id
                          ? 'border-wine-red bg-wine-red/5'
                          : 'border-ivory hover:border-wine-red/30 bg-white'
                      }`}
                    >
                      <h3 className="heading-sm text-charcoal mb-2">{option.label}</h3>
                      <p className="body-sm text-charcoal/60">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Placement */}
            {currentStep === 5 && (
              <div className="animate-fade-in">
                <h2 className="heading-lg mb-4 text-center">Select Embroidery Placement</h2>
                <p className="body-base text-charcoal/70 mb-10 text-center">
                  Where would you like the embroidery?
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {placementOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('placement', option.id)}
                      className={`p-6 border-2 rounded-lg text-left transition-all shadow-card hover:shadow-lg ${
                        formData.placement === option.id
                          ? 'border-wine-red bg-wine-red/5'
                          : 'border-ivory hover:border-wine-red/30 bg-white'
                      }`}
                    >
                      <h3 className="heading-sm text-charcoal mb-2">{option.label}</h3>
                      <p className="body-sm text-charcoal/60">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Upload Design Images */}
            {currentStep === 6 && (
              <div className="animate-fade-in">
                <h2 className="heading-lg mb-4 text-center">Upload Design References</h2>
                <p className="body-base text-charcoal/70 mb-10 text-center max-w-2xl mx-auto">
                  Share inspiration images of embroidery designs you like. {formData.logisticsOption === 'parcel-own' && 'You can also upload a photo of your clothing item.'}
                </p>
                
                <div className="space-y-6">
                  {/* Design Inspiration Image */}
                  <div className="bg-white p-8 border-2 border-dashed border-wine-red/30 rounded-lg">
                    <label className="block">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-wine-red/10 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🎨</span>
                        </div>
                        <div>
                          <h3 className="heading-sm text-charcoal">Design Inspiration Image *</h3>
                          <p className="text-sm text-charcoal/60">Upload embroidery design you'd like us to create</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('designImage', e)}
                        className="hidden"
                        id="design-upload"
                      />
                      <label
                        htmlFor="design-upload"
                        className="block w-full p-6 border-2 border-ivory rounded-lg hover:border-wine-red/50 transition-all cursor-pointer text-center bg-ivory/30"
                      >
                        {formData.designImage ? (
                          <div className="relative w-full h-48">
                            <Image src={formData.designImage} alt="Design preview" fill className="object-contain" />
                          </div>
                        ) : (
                          <div>
                            <p className="text-charcoal/70 mb-2">Click to upload image</p>
                            <p className="text-xs text-charcoal/50">PNG, JPG up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </label>
                  </div>

                  {/* Optional: Clothing Item Image */}
                  {formData.logisticsOption === 'parcel-own' && (
                    <div className="bg-white p-8 border-2 border-dashed border-ivory rounded-lg">
                      <label className="block">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-muted-gold/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👕</span>
                          </div>
                          <div>
                            <h3 className="heading-sm text-charcoal">Your Clothing Item (Optional)</h3>
                            <p className="text-sm text-charcoal/60">Photo of the garment you're sending</p>
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('clothingImage', e)}
                          className="hidden"
                          id="clothing-upload"
                        />
                        <label
                          htmlFor="clothing-upload"
                          className="block w-full p-6 border-2 border-ivory rounded-lg hover:border-wine-red/50 transition-all cursor-pointer text-center bg-ivory/30"
                        >
                          {formData.clothingImage ? (
                            <div className="relative w-full h-48">
                              <Image src={formData.clothingImage} alt="Clothing preview" fill className="object-contain" />
                            </div>
                          ) : (
                            <div>
                              <p className="text-charcoal/70 mb-2">Click to upload image</p>
                              <p className="text-xs text-charcoal/50">PNG, JPG up to 10MB</p>
                            </div>
                          )}
                        </label>
                      </label>
                    </div>
                  )}

                  {/* Color Palette Selection */}
                  <div className="bg-white p-8 border-2 border-ivory rounded-lg">
                    <h3 className="heading-sm text-charcoal mb-6">Thread Color Palette</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {colorPalettes.map(option => (
                        <button
                          key={option.id}
                          onClick={() => updateFormData('colorPalette', option.id)}
                          className={`p-6 border-2 rounded-lg transition-all ${
                            formData.colorPalette === option.id
                              ? 'border-wine-red bg-wine-red/5'
                              : 'border-ivory hover:border-wine-red/30'
                          }`}
                        >
                          <h4 className="heading-sm text-charcoal mb-4">{option.label}</h4>
                          <div className="flex gap-3 justify-center">
                            {option.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-12 h-12 rounded-lg shadow-md"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Final Notes & Summary */}
            {currentStep === 7 && (
              <div className="animate-fade-in">
                <h2 className="heading-lg mb-4 text-center">Almost Done!</h2>
                <p className="body-base text-charcoal/70 mb-10 text-center">
                  Review your selections and add any special notes.
                </p>
                
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="bg-gradient-to-br from-white to-ivory/30 p-8 rounded-lg border border-ivory shadow-card">
                    <h3 className="heading-md mb-6">Your Custom Design</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-ivory/50">
                        <dt className="text-charcoal/70">Logistics:</dt>
                        <dd className="font-medium text-charcoal capitalize">
                          {formData.logisticsOption === 'parcel-own' ? 'Parcel my own' : 'FABRO sources'}
                        </dd>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-ivory/50">
                        <dt className="text-charcoal/70">Clothing Type:</dt>
                        <dd className="font-medium text-charcoal capitalize">{formData.clothingType || 'Not selected'}</dd>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-ivory/50">
                        <dt className="text-charcoal/70">Fabric:</dt>
                        <dd className="font-medium text-charcoal capitalize">{formData.fabric || 'Not selected'}</dd>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-ivory/50">
                        <dt className="text-charcoal/70">Style:</dt>
                        <dd className="font-medium text-charcoal capitalize">{formData.embroideryStyle || 'Not selected'}</dd>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-ivory/50">
                        <dt className="text-charcoal/70">Placement:</dt>
                        <dd className="font-medium text-charcoal capitalize">{formData.placement || 'Not selected'}</dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-charcoal/70">Colors:</dt>
                        <dd className="font-medium text-charcoal capitalize">{formData.colorPalette || 'Not selected'}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Additional Notes */}
                  <div className="bg-white p-8 rounded-lg border border-ivory">
                    <label className="block">
                      <h3 className="heading-sm text-charcoal mb-4">Special Notes or Requirements</h3>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => updateFormData('notes', e.target.value)}
                        placeholder="Any specific details about sizing, timeline, special occasions, or customization preferences..."
                        rows={5}
                        className="textarea-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20 resize-none"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-between mt-12">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`btn px-8 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'btn-secondary'}`}
              >
                ← Previous
              </button>

              {currentStep < 7 ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !formData.logisticsOption) ||
                    (currentStep === 2 && !formData.clothingType) ||
                    (currentStep === 3 && !formData.fabric) ||
                    (currentStep === 4 && !formData.embroideryStyle) ||
                    (currentStep === 5 && !formData.placement) ||
                    (currentStep === 6 && !formData.designImage)
                  }
                  className={`btn px-8 ${
                    (currentStep === 1 && !formData.logisticsOption) ||
                    (currentStep === 2 && !formData.clothingType) ||
                    (currentStep === 3 && !formData.fabric) ||
                    (currentStep === 4 && !formData.embroideryStyle) ||
                    (currentStep === 5 && !formData.placement) ||
                    (currentStep === 6 && !formData.designImage)
                      ? 'opacity-50 cursor-not-allowed bg-charcoal/20 text-charcoal/50'
                      : 'btn-primary'
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-primary px-8"
                >
                  Send to Our Designer →
                </button>
              )}
            </div>

            <p className="text-xs text-center text-charcoal/60 italic mt-8">
              Made slow, styled fast. Your custom masterpiece begins here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
