import React from 'react';

const TermsOfUse = () => {
    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="font-montserrat text-4xl font-bold text-black mb-8">Terms of Use</h1>

                <div className="font-opensans text-black space-y-6 leading-relaxed">
                    <section>
                        <h2 className="font-montserrat text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
                        <p className="text-black opacity-100" style={{ color: '#000000' }}>
                            By accessing and using the Nova Wealth website, you accept and agree to be bound by the terms  and
                            provision of this agreement. If you do not agree to these terms, please do not use this website.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-montserrat text-2xl font-bold text-black mb-4">2. Use of Website</h2>
                        <p className="text-black opacity-100" style={{ color: '#000000' }}>
                            This website is intended to provide general information about Nova Wealth's services. The content is for
                            informational purposes only and should not be considered as financial, investment, or legal advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-montserrat text-2xl font-bold text-black mb-4">3. Intellectual Property</h2>
                        <p className="text-black opacity-100" style={{ color: '#000000' }}>
                            All content on this website, including text, graphics, logos, images, and software, is the property of
                            Nova Wealth and protected by applicable copyright and trademark laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-montserrat text-2xl font-bold text-black mb-4">4. Limitation of Liability</h2>
                        <p className="text-black opacity-100" style={{ color: '#000000' }}>
                            Nova Wealth shall not be liable for any direct, indirect, incidental, consequential, or punitive damages
                            arising from your use of this website or any information contained herein.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-montserrat text-2xl font-bold text-black mb-4">5. Privacy</h2>
                        <p className="text-black opacity-100" style={{ color: '#000000' }}>
                            Your use of this website is also governed by our Privacy Policy. Please review our Privacy Policy to
                            understand our practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-montserrat text-2xl font-bold text-black mb-4">6. Changes to Terms</h2>
                        <p className="text-black opacity-100" style={{ color: '#000000' }}>
                            Nova Wealth reserves the right to modify these terms at any time. Continued use of the website after
                            changes constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-montserrat text-2xl font-bold text-black mb-4">7. Contact Information</h2>
                        <p className="text-black opacity-100" style={{ color: '#000000' }}>
                            If you have any questions about these Terms of Use, please contact us through our Contact page or email
                            us at info@novawealth.co.ke.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
