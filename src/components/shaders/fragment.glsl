precision lowp float;

uniform sampler2D uTexture;
uniform float uGrayscale;
uniform float uScaleFactorX;
uniform float uScaleFactorY;

varying vec2 vUv;

void main() {

    vec2 st = (vUv * 2.0 - 1.0);
    st.x *= uScaleFactorX;
    st.y *= uScaleFactorY;

    st = st * 0.5 + 0.5;

    vec4 color = texture(uTexture, st);

    // Convert the color to grayscale
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Mix the original color with the grayscale color based on uGrayscale
    vec3 finalColor = mix(color.rgb, vec3(gray), uGrayscale);

    gl_FragColor = vec4(finalColor, color.a);
}